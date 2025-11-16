import { Workflow, Job, Step, Action, synth } from './index';
import * as fs from 'fs';

const workflowProps = {
  name: 'CI',
  on: {
    push: {
      branches: ['main', 'develop'],
    },
  },
};

// Create a workflow (root construct, scope is undefined)
const workflow = new Workflow(workflowProps);

// Create a job as a child of the workflow
const buildJob = new Job(workflow, 'build', {
  runsOn: 'ubuntu-latest',
  name: 'Build and Test',
});

// Add steps to the job (steps are children of the job)
Step.fromAction(buildJob, 'checkout', new Action('actions', 'checkout', 'v3'));

new Step(buildJob, 'setup-node', {
  name: 'Setup Node.js',
  uses: 'actions/setup-node@v3',
  with: {
    'node-version': '18',
  },
});

new Step(buildJob, 'install-deps', {
  name: 'Install dependencies',
  run: 'npm ci',
});

new Step(buildJob, 'run-tests', {
  name: 'Run tests',
  run: 'npm test',
});

// Register the job with the workflow (for metadata)
workflow.addJob('build', buildJob);

// Synthesize to YAML
const yaml = synth(workflow);

// Optionally write to a file
fs.writeFileSync('ci.yml', yaml);

