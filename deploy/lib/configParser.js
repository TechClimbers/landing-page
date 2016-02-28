var yaml = require('js-yaml');

module.exports = {};

module.exports.parse = function _configParserParse(yamlLiteral) {
  var doc = yaml.safeLoad(yamlLiteral);
  return {
    ignoredPaths: doc.ignore || []
  };
};
