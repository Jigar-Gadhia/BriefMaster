const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const MetroConfig = require('@ui-kitten/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const evaConfig = {
    evaPackage: '@eva-design/eva',
    // Optional, but may be useful when using mapping customization feature.
    // customMappingPath: './custom-mapping.json',
  };

module.exports = async () => {
  const defaultConfig = await mergeConfig(getDefaultConfig(__dirname), config);
  return MetroConfig.create(evaConfig, defaultConfig);
};
