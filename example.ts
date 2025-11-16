import { Workflow, Job, Step, Action, synth } from './index';
import * as fs from 'fs';

// Create a workflow
const workflow = new Workflow('CI', {
  push: {
    branches: ['main', 'develop'],
  },
  pullRequest: {
    branches: ['main'],
  },
});

// Create a job
const buildJob = new Job('ubuntu-latest');
buildJob.name = 'Build and Test';

// Add steps to the job
buildJob.addStep(
  Step.fromAction(new Action('actions', 'checkout', 'v3'))
);

buildJob.addStep(
  new Step({
    name: 'Setup Node.js',
    uses: 'actions/setup-node@v3',
    with: {
      'node-version': '18',
    },
  })
);

buildJob.addStep(
  new Step({
    name: 'Install dependencies',
    run: 'npm ci',
  })
);

buildJob.addStep(
  new Step({
    name: 'Run tests',
    run: 'npm test',
  })
);

// Add the job to the workflow
workflow.addJob('build', buildJob);

// Synthesize to YAML
const yaml = synth(workflow);

// Optionally write to a file
fs.writeFileSync('ci.yml', yaml);

