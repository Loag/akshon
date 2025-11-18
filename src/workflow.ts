import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { Construct } from 'constructs';
import { Job } from './job';

/**
 * Push event trigger configuration
 */
export interface PushTrigger {
  readonly branches?: string[];
  readonly tags?: string[];
  readonly paths?: string[];
  readonly pathsIgnore?: string[];
}

/**
 * Pull request event trigger configuration
 */
export interface PullRequestTrigger {
  readonly types?: string[];
  readonly branches?: string[];
  readonly branchesIgnore?: string[];
  readonly paths?: string[];
  readonly pathsIgnore?: string[];
}

/**
 * Workflow dispatch input configuration
 */
export interface WorkflowDispatchInput {
  readonly description: string;
  readonly required?: boolean;
  readonly default?: string;
  readonly type?: 'string' | 'choice' | 'boolean' | 'environment';
  readonly options?: string[];
}

/**
 * Workflow dispatch trigger configuration
 */
export interface WorkflowDispatchTrigger {
  readonly inputs?: Record<string, WorkflowDispatchInput>;
}

/**
 * Schedule item configuration
 */
export interface ScheduleItem {
  readonly cron: string;
}

/**
 * Repository dispatch trigger configuration
 */
export interface RepositoryDispatchTrigger {
  readonly types?: string[];
}

/**
 * Workflow call input configuration
 */
export interface WorkflowCallInput {
  readonly description: string;
  readonly required?: boolean;
  readonly default?: string;
  readonly type?: 'string' | 'boolean' | 'number';
}

/**
 * Workflow call output configuration
 */
export interface WorkflowCallOutput {
  readonly description: string;
  readonly value: string;
}

/**
 * Workflow call secret configuration
 */
export interface WorkflowCallSecret {
  readonly description: string;
  readonly required?: boolean;
}

/**
 * Workflow call trigger configuration
 */
export interface WorkflowCallTrigger {
  readonly inputs?: Record<string, WorkflowCallInput>;
  readonly outputs?: Record<string, WorkflowCallOutput>;
  readonly secrets?: Record<string, WorkflowCallSecret>;
}

/**
 * Workflow trigger events
 */
export interface WorkflowTriggers {
  /**
   * Trigger on push events
   */
  readonly push?: PushTrigger;

  /**
   * Trigger on pull request events
   */
  readonly pullRequest?: PullRequestTrigger;

  /**
   * Trigger on workflow dispatch (manual trigger)
   */
  readonly workflowDispatch?: WorkflowDispatchTrigger;

  /**
   * Trigger on schedule (cron)
   */
  readonly schedule?: ScheduleItem[];

  /**
   * Trigger on repository dispatch
   */
  readonly repositoryDispatch?: RepositoryDispatchTrigger;

  /**
   * Trigger on other workflow completion
   */
  readonly workflowCall?: WorkflowCallTrigger;
}

/**
 * Default run configuration
 */
export interface DefaultRunConfig {
  readonly shell?: string;
  readonly workingDirectory?: string;
}

/**
 * Default settings for jobs
 */
export interface WorkflowDefaults {
  readonly run?: DefaultRunConfig;
}

/**
 * Concurrency settings
 */
export interface WorkflowConcurrency {
  readonly group?: string;
  readonly cancelInProgress?: boolean;
}

/**
 * Workflow properties
 */
export interface WorkflowProps {
  readonly name: string;
  readonly on: WorkflowTriggers;
  readonly env?: Record<string, string>;
  readonly defaults?: WorkflowDefaults;
  readonly permissions?: Record<string, string | 'read' | 'write' | 'none'>;
  readonly concurrency?: WorkflowConcurrency;
}

/**
 * A GitHub Actions workflow
 */
export class Workflow extends Construct {
  /**
   * The name of the workflow
   */
  public readonly name: string;

  /**
   * When the workflow should run
   */
  public readonly on: WorkflowTriggers;

  /**
   * Environment variables available to all jobs
   */
  public env?: Record<string, string>;

  /**
   * Default settings for all jobs
   */
  public defaults?: WorkflowDefaults;

  /**
   * Permissions for the workflow
   */
  public permissions?: Record<string, string | 'read' | 'write' | 'none'>;

  /**
   * Concurrency settings
   */
  public concurrency?: WorkflowConcurrency;

  /**
   * Map of job IDs to jobs
   */
  private readonly jobIdMap: Map<string, Job> = new Map();

  constructor(props: WorkflowProps) {
    super(undefined as any, '');
    this.name = props.name;
    this.on = props.on;
    this.env = props.env;
    this.defaults = props.defaults;
    this.permissions = props.permissions;
    this.concurrency = props.concurrency;

    // Add validation
    this.node.addValidation({
      validate: () => this.validate(),
    });
  }

  /**
   * Add a job to this workflow
   */
  public addJob(id: string, job: Job): Job {
    // Ensure the job is a child of this workflow
    if (job.node.scope !== this) {
      // If job was created with a different scope, we need to re-parent it
      // In practice, jobs should be created with this workflow as the scope
      throw new Error(`Job must be created as a child of the workflow. Use: new Job(this, '${id}', ...)`);
    }
    this.jobIdMap.set(id, job);
    return job;
  }

  /**
   * Get a job by ID
   */
  public getJob(id: string): Job | undefined {
    return this.jobIdMap.get(id);
  }

  /**
   * Get all jobs in this workflow
   */
  public get jobs(): Job[] {
    return this.node.children.filter(child => child instanceof Job) as Job[];
  }

  /**
   * Synthesize this workflow to a YAML file
   * The file will be written to .github/workflows/ with a filename based on the workflow name
   * (spaces replaced with underscores, with .yml extension)
   * @returns The path to the generated file
   */
  public synth(): string {
    // Validate the construct tree before synthesizing
    const errors = this.node.validate();
    if (errors.length > 0) {
      throw new Error(`Validation errors:\n${errors.join('\n')}`);
    }

    const result: any = {
      name: this.name,
      on: this.synthesizeTriggers(),
    };

    if (this.env) {
      result.env = this.env;
    }

    if (this.defaults) {
      result.defaults = this.defaults;
    }

    if (this.permissions) {
      result.permissions = this.permissions;
    }

    if (this.concurrency) {
      result.concurrency = this.concurrency;
    }

    const jobsObj: any = {};
    // Get jobs in order they were added, using jobIdMap for IDs
    const jobs = this.node.children
      .filter(child => child instanceof Job)
      .map(child => {
        const job = child as Job;
        // Find the job ID from the map, or use the node id as fallback
        let jobId = job.node.id;
        for (const [id, j] of this.jobIdMap.entries()) {
          if (j === job) {
            jobId = id;
            break;
          }
        }
        return { id: jobId, job };
      })
      .sort((a, b) => {
        // Maintain order based on when they were added
        const aIndex = this.node.children.indexOf(a.job);
        const bIndex = this.node.children.indexOf(b.job);
        return aIndex - bIndex;
      });

    for (const { id, job } of jobs) {
      jobsObj[id] = job.synth();
    }
    result.jobs = jobsObj;

    // Convert to YAML and write to file
    const yamlContent = yaml.stringify(result);
    const yamlString = `# this file was generated by a tool. DO NOT EDIT\n\n${yamlContent}`;

    // Generate filename from workflow name: replace spaces with underscores and add .yml extension
    const fileName = `${this.name.replace(/\s+/g, '_')}.yml`;

    let outputDir = '.';
    if (process.env.AKSHON_WORKFLOW_DIR) {
      outputDir = process.env.AKSHON_WORKFLOW_DIR;
    }

    const filePath = path.join(outputDir, fileName);

    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, yamlString, { encoding: 'utf8' });

    return filePath;
  }

  /**
   * Validate the workflow
   */
  private validate(): string[] {
    const errors: string[] = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push('Workflow name is required');
    }

    if (!this.on || Object.keys(this.on).length === 0) {
      errors.push('Workflow must have at least one trigger');
    }

    if (this.jobs.length === 0) {
      errors.push('Workflow must have at least one job');
    }

    // Check for duplicate job IDs
    const jobIds = new Set<string>();
    for (const [id] of this.jobIdMap.entries()) {
      if (jobIds.has(id)) {
        errors.push(`Duplicate job ID: ${id}`);
      }
      jobIds.add(id);
    }

    return errors;
  }

  private synthesizeTriggers(): any {
    const triggers: any = {};

    if (this.on.push) {
      triggers.push = this.on.push;
    }

    if (this.on.pullRequest) {
      triggers['pull_request'] = this.on.pullRequest;
    }

    if (this.on.workflowDispatch) {
      triggers['workflow_dispatch'] = this.on.workflowDispatch;
    }

    if (this.on.schedule) {
      triggers.schedule = this.on.schedule;
    }

    if (this.on.repositoryDispatch) {
      triggers['repository_dispatch'] = this.on.repositoryDispatch;
    }

    if (this.on.workflowCall) {
      triggers['workflow_call'] = this.on.workflowCall;
    }

    // Add any custom triggers
    for (const [key, value] of Object.entries(this.on)) {
      if (!['push', 'pullRequest', 'workflowDispatch', 'schedule', 'repositoryDispatch', 'workflowCall'].includes(key)) {
        triggers[key] = value;
      }
    }

    return triggers;
  }
}

