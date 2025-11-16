// prebuilt action for checkout

import { Construct } from 'constructs';
import { Action } from '../action';
import { Step } from '../step';

export interface CheckoutProps {
  /**
   * Repository name with owner. For example, actions/checkout
   * Default: ${{ github.repository }}
   */
  repository?: string;

  /**
   * The branch, tag or SHA to checkout. When checking out the repository that
   * triggered a workflow, this defaults to the reference or SHA for that event.
   * Otherwise, uses the default branch.
   */
  ref?: string;

  /**
   * Personal access token (PAT) used to fetch the repository. The PAT is configured
   * with the local git config, which enables your scripts to run authenticated git
   * commands. The post-job step removes the PAT.
   *
   * We recommend using a service account with the least permissions necessary. Also
   * when generating a new PAT, select the least scopes necessary.
   *
   * [Learn more about creating and using encrypted secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
   *
   * Default: ${{ github.token }}
   */
  token?: string;

  /**
   * SSH key used to fetch the repository. The SSH key is configured with the local
   * git config, which enables your scripts to run authenticated git commands. The
   * post-job step removes the SSH key.
   *
   * We recommend using a service account with the least permissions necessary.
   *
   * [Learn more about creating and using encrypted secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets)
   */
  sshKey?: string;

  /**
   * Known hosts in addition to the user and global host key database. The public SSH
   * keys for a host may be obtained using the utility `ssh-keyscan`. For example,
   * `ssh-keyscan github.com`. The public key for github.com is always implicitly
   * added.
   */
  sshKnownHosts?: string;

  /**
   * Whether to perform strict host key checking. When true, adds the options
   * `StrictHostKeyChecking=yes` and `CheckHostIP=no` to the SSH command line. Use
   * the input `ssh-known-hosts` to configure additional hosts.
   * Default: true
   */
  sshStrict?: string;

  /**
   * The user to use when connecting to the remote SSH host. By default 'git' is
   * used.
   * Default: git
   */
  sshUser?: string;

  /**
   * Whether to configure the token or SSH key with the local git config
   * Default: true
   */
  persistCredentials?: string;

  /**
   * Relative path under $GITHUB_WORKSPACE to place the repository
   */
  path?: string;

  /**
   * Whether to execute `git clean -ffdx && git reset --hard HEAD` before fetching
   * Default: true
   */
  clean?: string;

  /**
   * Partially clone against a given filter. Overrides sparse-checkout if set.
   * Default: null
   */
  filter?: string;

  /**
   * Do a sparse checkout on given patterns. Each pattern should be separated with
   * new lines.
   * Default: null
   */
  sparseCheckout?: string;

  /**
   * Specifies whether to use cone-mode when doing a sparse checkout.
   * Default: true
   */
  sparseCheckoutConeMode?: string;

  /**
   * Number of commits to fetch. 0 indicates all history for all branches and tags.
   * Default: 1
   */
  fetchDepth?: string;

  /**
   * Whether to fetch tags, even if fetch-depth > 0.
   * Default: false
   */
  fetchTags?: string;

  /**
   * Whether to show progress status output when fetching.
   * Default: true
   */
  showProgress?: string;

  /**
   * Whether to download Git-LFS files
   * Default: false
   */
  lfs?: string;

  /**
   * Whether to checkout submodules: `true` to checkout submodules or `recursive` to
   * recursively checkout submodules.
   *
   * When the `ssh-key` input is not provided, SSH URLs beginning with
   * `git@github.com:` are converted to HTTPS.
   *
   * Default: false
   */
  submodules?: string;

  /**
   * Add repository path as safe.directory for Git global config by running `git
   * config --global --add safe.directory <path>`
   * Default: true
   */
  setSafeDirectory?: string;

  /**
   * The base URL for the GitHub instance that you are trying to clone from, will use
   * environment defaults to fetch from the same instance that the workflow is
   * running from unless specified. Example URLs are https://github.com or
   * https://my-ghes-server.example.com
   */
  githubServerUrl?: string;
}

const CheckoutVersion = {
  V5: "v5"
} as const;

export function checkout(construct: Construct, version: typeof CheckoutVersion[keyof typeof CheckoutVersion], props?: CheckoutProps): Step {
  return Step.fromAction(construct, 'checkout', new Action('actions', 'checkout', version), {
    with: props,
  });
}

export function checkoutV5(construct: Construct, props?: CheckoutProps): Step {
  return checkout(construct, CheckoutVersion.V5, props);
}