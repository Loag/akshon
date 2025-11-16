import { Workflow, Job, Step, Action, synth } from './src/index';
import * as fs from 'fs';

const workflowProps = {
  name: 'build akshon artifact',
  on: {
    push: {
      branches: ['master'],
    },
  },
};

const workflow = new Workflow(workflowProps);

const buildJob = new Job(workflow, 'build', {
  runsOn: 'ubuntu-latest',
  name: 'Build',
});

Step.fromAction(buildJob, 'checkout', new Action('actions', 'checkout', 'v5'));

Step.fromAction(buildJob, 'setup-node', new Action('actions', 'setup-node', 'v5'), {
  with: {
    'node-version': '24.11.1',
  },
});

new Step(buildJob, 'install-deps', {
  name: 'Install dependencies',
  run: 'npm install',
});

new Step(buildJob, 'build', {
  name: 'Build',
  run: 'npm run build',
});

Step.fromAction(buildJob, 'upload-artifact', new Action('actions', 'upload-artifact', 'v5'), {
  with: {
    name: 'build-artifact',
    path: 'dist',
    overwrite: true
  },
});

workflow.addJob('build', buildJob);

const yaml = synth(workflow);

fs.writeFileSync('.github/workflows/build.yml', yaml);

