import probotGetConfig from 'probot-config';

/**
 * Load config from the repository’s .github/regex-check.yml
 * If configuration file does not exist, use default config
 */
const getConfig = async (context) => {
    const config = await loadConfig(context);
    return config ? config : getDefaultConfig();
}

const loadConfig = (context) => {
    return probotGetConfig(context, 'regex-check.yml');
}

const getDefaultConfig = () => {
  return {
    mustMatch: null,
    mustNotMatch: [
      'WIP',
      'DNM',
      'Work in Progress',
      'Do Not Merge'
    ],
    caseSensitive: false,
    failureStatus: 'in_progress',
  }
}

export default getConfig;
