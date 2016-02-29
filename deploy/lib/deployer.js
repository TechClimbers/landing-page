var temp = require('temp').track();

module.exports = {};

module.exports.createDeploy = function _deployerCreateDeploy(params) {
  return {
    repo: params.repo,
    fetcher: params.fetcher
    };
};

module.exports.checkout = function _deployerCheckout(deployObject, callback) {
  temp.mkdir('repo', function(err, dirPath) {
    if (err) {
      return callback(err);
    }

    deployObject.fetcher.Clone(deployObject.repo, dirPath, function(err, repo) {
      if (err)
        return callback(err);

      deployObject.checkoutDir = dirPath;
      return callback(null, deployObject);
    });
  });
};

module.exports.checkoutDir = function _deployerCheckoutDir(deployObject) {
  return deployObject.checkoutDir;
};
