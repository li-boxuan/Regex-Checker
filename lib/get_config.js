/**
 * Load config from the repository’s .github/regex-check.yml
 * If configuration file does not exist, use default config
 */
getConfig = () => {
    const config = {
        must_match: null,
        must_not_match: [
            'WIP',
            'DNM',
            'Work in Progress',
            'Do Not Merge',
        ],
        case_sensitive: false,
        failure_status: 'in_progress',
    };
    return config;
}