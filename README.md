# Regex Checker

> A GitHub App that checks Pull Request titles with the power of
user-defined regular expression. It is completely free.

<a href="https://stats.uptimerobot.com/xlkjDf0QE" rel="nofollow"><img src="https://img.shields.io/uptimerobot/status/m781823823-ab164d98e412f4ec1e31c4c3.svg" alt="Uptime Robot status"></a>
<a href="https://travis-ci.org/li-boxuan/Regex-Checker" rel="nofollow"><img alt="Build Status" src="https://travis-ci.org/li-boxuan/Regex-Checker.svg?branch=master"></a>
<a href="https://coveralls.io/github/li-boxuan/Regex-Checker?branch=master" rel="nofollow"><img alt="Branch Coverage" src="https://img.shields.io/codecov/c/github/li-boxuan/Regex-Checker/master.svg?label=branch%20coverage"></a>

Usage demo 1: Prevent certain pattern (regular expression)

![DNM demo](static/DNM_demo.gif)

Usage demo 2: Require certain pattern (regular expression)

![Regex demo](static/regex-demo.gif)

## Quick Start

To use Regex Checker, all you need to do is just as simple as:
1. Go to https://github.com/apps/regex-checker
2. Install it to your repositories
3. Start using it!
4. (Optional) Add config file for advanced features

### Default Feature
By default, Regex Checker checks the title of every pull request and
mark GitHub checks as in progress if any of the following pattern
(case insensitive) is found:
- WIP
- DNM
- Work in Progress
- Do Not Merge

### Advanced Features
Create a `.github/regex-check.yml` in your repository. This will
override default settings.

Example:
```yaml
# mustMatch: a string (natural language or regular expression) that
# the Pull Request title must match.
# leave it empty or comment it if you don't need it.
# You may need to have quotes wrapped around, otherwise it cannot be
# parsed correctly in yaml format.

mustMatch: "^([^:]*|[^:]+[^ ]: [A-Z0-9*].*)$"

# The above will match `README.md: Update` or `Update README`,
# but not `README.md:Update` (missing space after colon) or `README.md: update`
# (shortlog needs to begin with a capital letter)
# If you want the regular expression to match the whole title exactly, use
# ^ at the beginning and $ at the end.


# mustNotMatch: a list of strings that the Pull Request title must NOT contain
# leave it empty or comment it if you don't need it. You can have a mixed list
# of natural terms and regular expressions.

mustNotMatch:
  - WIP
  - DNM
  - "^#" # regular expression that prevents hashtag at the beginning of title


# caseSensitive: whether you want your patterns to be case sensitive or not.
# In case insensitive mode, `WIP` would match `WIP`, `wip`, `Wip`, etc.
# Be careful that this might cause some unexpected match for regular expressions.

caseSensitive: true


# failureStatus: Use `in_progress` or `failure`.

failureStatus: in_progress
```

If you don't know about or are not familiar with regular expression,
[this](https://regexone.com/) is a great resource and tutorial.

You can use [regex101](https://regex101.com) to test your regular expression online.

## Development and Contributing
### Setup on your own server

Regex Checker is based on [Probot](https://probot.github.io/), a free GitHub App framework. It is running on heroku as a service 7x24 hours, so you don't need to
bother installing or deploying it. However, If you do like to develop or deploy
this App on your own server, refer to [Probot Deployment Doc](https://probot.github.io/docs/deployment/).

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

### Contributing

If you have suggestions for how regex-checker could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

### License

[ISC](LICENSE) © 2019 Boxuan Li <liboxuan@connect.hku.hk>
