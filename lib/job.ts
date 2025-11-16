import { ISynthesizable } from './synthesis';
import { Step } from './step';

/**
 * A GitHub Actions job
 */
export class Job implements ISynthesizable {
  /**
   * The type of machine to run the job on
   */
  public readonly runsOn: string | string[];

  /**
   * The steps in this job
   */
  private readonly steps: Step[] = [];

  /**
   * Jobs that must complete successfully before this job runs
   */
  public needs?: string[];

  /**
   * Environment variables for this job
   */
  public env?: Record<string, string>;

  /**
   * The name of the job
   */
  public name?: string;

  /**
   * The default shell to use for run steps
   */
  public defaults?: {
    run?: {
      shell?: string;
      workingDirectory?: string;
    };
  };

  /**
   * The strategy to use for matrix builds
   */
  public strategy?: {
    matrix: Record<string, any[]>;
    failFast?: boolean;
    maxParallel?: number;
  };

  /**
   * Continue running other jobs if this job fails
   */
  public continueOnError?: boolean;

  /**
   * The timeout in minutes
   */
  public timeoutMinutes?: number;

  /**
   * Permissions for this job
   */
  public permissions?: Record<string, string | 'read' | 'write' | 'none'>;

  /**
   * The container to run the job in
   */
  public container?: {
    image: string;
    credentials?: {
      username: string;
      password: string;
    };
    env?: Record<string, string>;
    ports?: number[];
    volumes?: string[];
    options?: string;
  };

  /**
   * Services to run alongside the job
   */
  public services?: Record<string, {
    image: string;
    credentials?: {
      username: string;
      password: string;
    };
    env?: Record<string, string>;
    ports?: string[];
    volumes?: string[];
    options?: string;
  }>;

  /**
   * The output variables from this job
   */
  public outputs?: Record<string, string>;

  constructor(runsOn: string | string[]) {
    this.runsOn = runsOn;
  }

  /**
   * Add a step to this job
   */
  public addStep(step: Step): void {
    this.steps.push(step);
  }

  /**
   * Synthesize this job to a plain object
   */
  public synthesize(): any {
    const result: any = {
      'runs-on': this.runsOn,
    };

    if (this.name) {
      result.name = this.name;
    }

    if (this.needs) {
      result.needs = this.needs;
    }

    if (this.env) {
      result.env = this.env;
    }

    if (this.defaults) {
      result.defaults = this.defaults;
    }

    if (this.strategy) {
      result.strategy = this.strategy;
    }

    if (this.continueOnError !== undefined) {
      result['continue-on-error'] = this.continueOnError;
    }

    if (this.timeoutMinutes !== undefined) {
      result['timeout-minutes'] = this.timeoutMinutes;
    }

    if (this.permissions) {
      result.permissions = this.permissions;
    }

    if (this.container) {
      result.container = this.container;
    }

    if (this.services) {
      result.services = this.services;
    }

    if (this.outputs) {
      result.outputs = this.outputs;
    }

    result.steps = this.steps.map(step => step.synthesize());

    return result;
  }
}

