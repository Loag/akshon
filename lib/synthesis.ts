import * as yaml from 'js-yaml';

/**
 * Interface for objects that can be synthesized to a plain object representation
 */
export interface ISynthesizable {
  /**
   * Synthesize this object to a plain object that can be serialized
   */
  synthesize(): any;
}

/**
 * Synthesize a workflow to YAML string
 */
export function synth(workflow: ISynthesizable): string {
  const obj = workflow.synthesize();
  return yaml.dump(obj, {
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
}

