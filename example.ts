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
    'node-version': 24.11,
  },
});

Step.fromAction(buildJob, 'setup-java', new Action('actions', 'setup-java', 'v4'), {
  with: {
    "distribution": 'temurin',
    "java-version": 17
  },
});

Step.fromAction(buildJob, 'setup-dotnet', new Action('actions', 'setup-dotnet', 'v4'), {
  with: {
    "dotnet-version": 8.0,
  },
});

Step.fromAction(buildJob, 'setup-python', new Action('actions', 'setup-python', 'v4'), {
  with: {
    "python-version": 3.11,
  },
});

Step.fromAction(buildJob, 'setup-go', new Action('actions', 'setup-go', 'v4'), {
  with: {
    "go-version": 1.23,
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

new Step(buildJob, 'package', {
  name: 'Package',
  run: 'npm run package',
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

