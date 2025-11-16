import { Construct } from 'constructs';
import { Job } from './job';
import { ISynth } from './synth';

/**
 * Workflow trigger events
 */
export interface WorkflowTriggers {
  /**
   * Trigger on push events
   */
  push?: {
    branches?: string[];
    tags?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };

  /**
   * Trigger on pull request events
   */
  pullRequest?: {
    types?: string[];
    branches?: string[];
    branchesIgnore?: string[];
    paths?: string[];
    pathsIgnore?: string[];
  };

  /**
   * Trigger on workflow dispatch (manual trigger)
   */
  workflowDispatch?: {
    inputs?: Record<string, {
      description: string;
      required?: boolean;
      default?: string;
      type?: 'string' | 'choice' | 'boolean' | 'environment';
      options?: string[];
    }>;
  };

  /**
   * Trigger on schedule (cron)
   */
  schedule?: Array<{
    cron: string;
  }>;

  /**
   * Trigger on repository dispatch
   */
  repositoryDispatch?: {
    types?: string[];
  };

  /**
   * Trigger on other workflow completion
   */
  workflowCall?: {
    inputs?: Record<string, {
      description: string;
      required?: boolean;
      default?: string;
      type?: 'string' | 'boolean' | 'number';
    }>;
    outputs?: Record<string, {
      description: string;
      value: string;
    }>;
    secrets?: Record<string, {
      description: string;
      required?: boolean;
    }>;
  };

  /**
   * Custom event triggers
   */
  [key: string]: any;
}

/**
 * A GitHub Actions workflow
 */
export class Workflow extends Construct implements ISynth {
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
  public defaults?: {
    run?: {
      shell?: string;
      workingDirectory?: string;
    };
  };

  /**
   * Permissions for the workflow
   */
  public permissions?: Record<string, string | 'read' | 'write' | 'none'>;

  /**
   * Concurrency settings
   */
  public concurrency?: {
    group?: string;
    cancelInProgress?: boolean;
  };

  /**
   * Map of job IDs to jobs
   */
  private readonly jobIdMap: Map<string, Job> = new Map();

  constructor(props: {
    name: string;
    on: WorkflowTriggers;
    env?: Record<string, string>;
    defaults?: {
      run?: {
        shell?: string;
        workingDirectory?: string;
      };
    };
    permissions?: Record<string, string | 'read' | 'write' | 'none'>;
    concurrency?: {
      group?: string;
      cancelInProgress?: boolean;
    };
  }) {
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
   * Synthesize this workflow to a plain object
   */
  public synth(): any {
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

    return result;
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

