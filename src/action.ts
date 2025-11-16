/**
 * A GitHub Actions action reference
 */
export class Action {
  /**
   * The owner of the action (e.g., "actions")
   */
  public readonly owner: string;

  /**
   * The name of the action (e.g., "checkout")
   */
  public readonly name: string;

  /**
   * The version/ref of the action (e.g., "v3" or "main")
   */
  public readonly version?: string;

  constructor(owner: string, name: string, version?: string) {
    this.owner = owner;
    this.name = name;
    this.version = version;
  }

  /**
   * Create an action from a string (e.g., "actions/checkout@v3")
   */
  public static fromString(actionString: string): Action {
    const parts = actionString.split('@');
    const [owner, name] = parts[0].split('/');
    const version = parts[1];
    return new Action(owner, name, version);
  }

  /**
   * Convert this action to a string representation
   */
  public toString(): string {
    if (this.version) {
      return `${this.owner}/${this.name}@${this.version}`;
    }
    return `${this.owner}/${this.name}`;
  }
}

