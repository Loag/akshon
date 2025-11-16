import { Construct } from 'constructs';
import { Action } from './action';
import { ISynth } from './synth';
/**
 * A step in a GitHub Actions job
 */
export class Step extends Construct implements ISynth {
  /**
   * The name of the step
   */
  public name?: string;

  /**
   * The action to use (e.g., "actions/checkout@v3")
   */
  public uses?: string;

  /**
   * The shell command to run
   */
  public run?: string;

  /**
   * Environment variables for this step
   */
  public env?: Record<string, string>;

  /**
   * Inputs for the action
   */
  public with?: Record<string, any>;

  /**
   * The working directory for this step
   */
  public workingDirectory?: string;

  /**
   * The shell to use for run steps
   */
  public shell?: string;

  /**
   * The ID of this step (for referencing in other steps)
   */
  public id?: string;

  /**
   * Continue running other steps if this step fails
   */
  public continueOnError?: boolean;

  /**
   * The timeout in minutes
   */
  public timeoutMinutes?: number;

  /**
   * Condition for when this step should run
   */
  public if?: string;

  constructor(scope: Construct, id: string, props?: {
    name?: string;
    uses?: string;
    run?: string;
    env?: Record<string, string>;
    with?: Record<string, any>;
    workingDirectory?: string;
    shell?: string;
    id?: string;
    continueOnError?: boolean;
    timeoutMinutes?: number;
    if?: string;
  }) {
    super(scope, id);
    if (props) {
      this.name = props.name;
      this.uses = props.uses;
      this.run = props.run;
      this.env = props.env;
      this.with = props.with;
      this.workingDirectory = props.workingDirectory;
      this.shell = props.shell;
      this.id = props.id;
      this.continueOnError = props.continueOnError;
      this.timeoutMinutes = props.timeoutMinutes;
      this.if = props.if;
    }

    // Add validation
    this.node.addValidation({
      validate: () => this.validate(),
    });
  }

  /**
   * Create a step from an Action
   */
  public static fromAction(scope: Construct, id: string, action: Action, props?: {
    name?: string;
    env?: Record<string, string>;
    with?: Record<string, any>;
    id?: string;
    continueOnError?: boolean;
    timeoutMinutes?: number;
    if?: string;
  }): Step {
    const step = new Step(scope, id, {
      name: props?.name,
      uses: action.toString(),
      env: props?.env,
      with: props?.with,
      id: props?.id,
      continueOnError: props?.continueOnError,
      timeoutMinutes: props?.timeoutMinutes,
      if: props?.if,
    });
    return step;
  }

  /**
   * Synthesize this step to a plain object
   */
  public synth(): any {
    const result: any = {};

    if (this.name) {
      result.name = this.name;
    }

    if (this.uses) {
      result.uses = this.uses;
    }

    if (this.run) {
      result.run = this.run;
    }

    if (this.env) {
      result.env = this.env;
    }

    if (this.with) {
      result.with = this.with;
    }

    if (this.workingDirectory) {
      result['working-directory'] = this.workingDirectory;
    }

    if (this.shell) {
      result.shell = this.shell;
    }

    if (this.id) {
      result.id = this.id;
    }

    if (this.continueOnError !== undefined) {
      result['continue-on-error'] = this.continueOnError;
    }

    if (this.timeoutMinutes !== undefined) {
      result['timeout-minutes'] = this.timeoutMinutes;
    }

    if (this.if) {
      result.if = this.if;
    }

    return result;
  }

  /**
   * Validate the step
   */
  private validate(): string[] {
    const errors: string[] = [];

    if (!this.uses && !this.run) {
      errors.push('Step must have either uses or run');
    }

    if (this.uses && this.run) {
      errors.push('Step cannot have both uses and run');
    }

    return errors;
  }
}

