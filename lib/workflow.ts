import { ISynthesizable } from './synthesis';
import { Job } from './job';

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
export class Workflow implements ISynthesizable {
  /**
   * The name of the workflow
   */
  public readonly name: string;

  /**
   * When the workflow should run
   */
  public readonly on: WorkflowTriggers;

  /**
   * The jobs in this workflow
   */
  private readonly jobs: Map<string, Job> = new Map();

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

  constructor(name: string, on: WorkflowTriggers) {
    this.name = name;
    this.on = on;
  }

  /**
   * Add a job to this workflow
   */
  public addJob(id: string, job: Job): void {
    this.jobs.set(id, job);
  }

  /**
   * Get a job by ID
   */
  public getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  /**
   * Synthesize this workflow to a plain object
   */
  public synthesize(): any {
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
    for (const [id, job] of Array.from(this.jobs.entries())) {
      jobsObj[id] = job.synthesize();
    }
    result.jobs = jobsObj;

    return result;
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

