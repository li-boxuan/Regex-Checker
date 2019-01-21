const getConfig = require('./lib/get_config');

export default app => {
  app.on([
    'pull_request.opened',
    'pull_request.edited',
  ], check)

  async function check (context) {
    const pullRequest = context.payload.pull_request
    const title = pullRequest.title
    const pattern = /WIP/
    const match = pattern.test(title)

    let checkOptions = {
      name: 'Regex Check',
      head_sha: pullRequest.head.sha,
    }

    if (match) {
      checkOptions = {
        ...checkOptions,
        status: 'completed',
        conclusion: 'failure',
        completed_at: new Date(),
        output: {
          title: `Title contains WIP`,
          summary: `The title "${pullRequest.title}" contains WIP.`,
          text: `By default, WIP only checks the pull request title for the terms "WIP"`,
        }
      }
    } else {
      checkOptions = {
        ...checkOptions,
        status: 'completed',
        conclusion: 'success',
        completed_at: new Date(),
        output: {
          title: 'Ready for review',
          summary: 'No match found',
        }
      }
    }
    return context.github.checks.create(context.repo(checkOptions));
  }
}
