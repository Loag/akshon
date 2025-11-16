import { Construct } from 'constructs';
import { Step } from './step';
import { Workflow } from './workflow';
import { ISynth } from './synth';
/**
 * A GitHub Actions job
 */
export class Job extends Construct implements ISynth {
  /**
   * The type of machine to run the job on
   */
  public readonly runsOn: string | string[];

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

  constructor(scope: Construct, id: string, props: {
    runsOn: string | string[];
    name?: string;
    needs?: string[];
    env?: Record<string, string>;
    defaults?: {
      run?: {
        shell?: string;
        workingDirectory?: string;
      };
    };
    strategy?: {
      matrix: Record<string, any[]>;
      failFast?: boolean;
      maxParallel?: number;
    };
    continueOnError?: boolean;
    timeoutMinutes?: number;
    permissions?: Record<string, string | 'read' | 'write' | 'none'>;
    container?: {
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
    services?: Record<string, {
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
    outputs?: Record<string, string>;
  }) {
    super(scope, id);
    this.runsOn = props.runsOn;
    this.name = props.name;
    this.needs = props.needs;
    this.env = props.env;
    this.defaults = props.defaults;
    this.strategy = props.strategy;
    this.continueOnError = props.continueOnError;
    this.timeoutMinutes = props.timeoutMinutes;
    this.permissions = props.permissions;
    this.container = props.container;
    this.services = props.services;
    this.outputs = props.outputs;

    // Add validation
    this.node.addValidation({
      validate: () => this.validate(),
    });
  }

  /**
   * Add a step to this job
   */
  public addStep(step: Step): Step {
    // Ensure the step is a child of this job
    if (step.node.scope !== this) {
      throw new Error(`Step must be created as a child of the job. Use: new Step(this, '${step.node.id}', ...)`);
    }
    return step;
  }

  /**
   * Get all steps in this job
   */
  public get steps(): Step[] {
    return this.node.children.filter(child => child instanceof Step) as Step[];
  }

  /**
   * Synthesize this job to a plain object
   */
  public synth(): any {
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

    // Get steps in order they were added
    const steps = this.node.children
      .filter(child => child instanceof Step)
      .sort((a, b) => {
        const aIndex = this.node.children.indexOf(a);
        const bIndex = this.node.children.indexOf(b);
        return aIndex - bIndex;
      }) as Step[];

    result.steps = steps.map(step => step.synth());

    return result;
  }

  /**
   * Validate the job
   */
  private validate(): string[] {
    const errors: string[] = [];

    if (!this.runsOn || (Array.isArray(this.runsOn) && this.runsOn.length === 0)) {
      errors.push('Job must specify runs-on');
    }

    if (this.steps.length === 0) {
      errors.push('Job must have at least one step');
    }

    // Validate needs references exist in parent workflow
    if (this.needs && this.needs.length > 0) {
      const workflow = this.node.scope;
      if (workflow && workflow instanceof Workflow) {
        const jobIds = new Set<string>();
        // Get job IDs from the workflow's jobIdMap
        for (const child of workflow.node.children) {
          if (child instanceof Job) {
            // Try to find the job ID from the workflow's map
            let jobId = child.node.id;
            for (const [id, job] of (workflow as any).jobIdMap.entries()) {
              if (job === child) {
                jobId = id;
                break;
              }
            }
            jobIds.add(jobId);
          }
        }
        for (const need of this.needs) {
          if (!jobIds.has(need)) {
            errors.push(`Job dependency '${need}' not found in workflow`);
          }
        }
      }
    }

    return errors;
  }
}

