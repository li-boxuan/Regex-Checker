import getConfig from './get_config';

const createCheck = ({pass, failureStatus, output, startedAt, context}) => {
  const pullRequest = context.payload.pull_request;

  let checkOptions = {
    name: 'Regex Check',
    head_sha: pullRequest.head.sha,
    started_at: startedAt,
  };
  if (!pass) {
    checkOptions = {
      ...checkOptions,
      status: 'in_progress',
      output,
    };
    if (failureStatus === 'failure') {
      checkOptions.completed_at = new Date(),
      checkOptions.status = 'completed';
      checkOptions.conclusion = 'failure';
    } else if (failureStatus !== 'in_progress') {
      console.log(`failureStatus ${failureStatus} is invalid,
        use in_progress by default`);
    }
  } else {
    checkOptions = {
      ...checkOptions,
      completed_at: new Date(),
      status: 'completed',
      conclusion: 'success',
      output: {
        title: 'Ready for review',
        summary: 'Regex checks passed',
      },
    };
  }
  return context.github.checks.create(context.repo(checkOptions));
};

const string2Regex = (pattern, caseSensitive) => {
  return caseSensitive ? new RegExp(pattern) : new RegExp(pattern, 'i');
};

const check = async (context) => {
  const startedAt = new Date();
  const pullRequest = context.payload.pull_request;
  const title = pullRequest.title;
  const { mustMatch, mustNotMatch, caseSensitive, failureStatus } = await getConfig(context);

  /**
   * Check mustNotMatch field
   * mustNotMatch is a list of regular expressions and none of them is allowed in
   * the pull request title. For example, mustNotMatch might contain 'WIP' (work in
   * progress), 'DNM' (do not merge), '#\d+' (to prevent mentioning issue number).
   */
  for (const pattern of mustNotMatch) {
    if (string2Regex(pattern, caseSensitive).test(title)) {
      const output = {
        title: `title contains ${pattern}`,
        summary: `title "${pullRequest.title}" contains forbidden word "${pattern}"`,
      };
      return createCheck({pass: false, failureStatus, output, startedAt, context});
    }
  }

  /**
   * Check mustMatch field
   * mustMatch is a single regular expression that the title must match.
   * e.g. '^([^:]*|[^:]+[^ ]: [A-Z0-9*].*)$'
   */
  if (mustMatch && !string2Regex(mustMatch, caseSensitive).test(title)) {
    const output = {
      title: `title must match ${mustMatch}`,
      summary: `title "${pullRequest.title}" does not contain "${mustMatch}"`,
    };
    return createCheck({pass: false, failureStatus, output, startedAt, context});
  }

  // pass regular expression checks
  return createCheck({pass: true, startedAt, context});
};

module.exports = app => {
  app.on([
    'pull_request.opened',
    'pull_request.edited',
  ], check);
};
