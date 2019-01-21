/**
 * Load config from the repository’s .github/regex-check.yml
 * If configuration file does not exist, use default config
 */
const getConfig = () => {
  const config = {
    mustMatch: null,
    mustNotMatch: [
      'WIP',
      'DNM',
      'Work in Progress',
      'Do Not Merge'
    ],
    caseSensitive: false,
    failureStatus: 'in_progress'
  }
  return config
}

export default getConfig
