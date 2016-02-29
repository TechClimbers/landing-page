var git = require('nodegit');

module.exports = {};
module.exports.Clone = function(repoUrl, clonePath, callback) {
  git.Clone(repoUrl, clonePath).then(function(repo) {
    callback(null, repo);
  });
};
