import { extend } from "./utils";

const defaultConfig = {
  opt_in_event_name: 'oil_optin_done'
};

/**
 * Merges options or the given element in the following order:
 * - the given defaults
 * - the given options
 * @param options - an object with specific options
 * @param defaults - an object with default options
 * @returns {{}} merged options
 * @function
 */
export function mergeOptions(options, defaults) {
    defaults = defaults || {};
    options = options || {};
    return extend(true, {}, defaults, options);
}

/**
 * Read configuration of component from JSON script block
 * @param {Element} - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
export function readConfiguration(configuration) {
    let parsedConfig = null;
    try {
        if (configuration.text) {
            parsedConfig = JSON.parse(configuration.text);
        }
    } catch (ignored) {}
    return mergeOptions(parsedConfig, defaultConfig);
}

/**
 * Search HTML document for configuration and reads it in
 * @returns parsed config
 */
export function findConfiguration() {
    let configurationElement = document.querySelector('script[type="application/configuration"]'),
        config = null;
    if (configurationElement) {
        config = readConfiguration(configurationElement);
    }
    return config;
}