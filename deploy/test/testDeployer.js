var fs = require('fs');
var should = require('chai').should();
var sinon = require('sinon');

var repoFetcher = require('../lib/repoFetcher');
var deployer = require('../lib/deployer');

describe('deployer.checkout', function() {
  beforeEach(function() {
    sinon.stub(repoFetcher, 'Clone');
  });

  afterEach(function() {
    repoFetcher.Clone.restore();
  });

  it('should checkout my repo', function(done) {
    var repoURL = "https://github.com/TechClimbers/landing-page.git";
    repoFetcher.Clone.yields(null, {repo: "repo"});

    var deploy = deployer.createDeploy({repo: repoURL, fetcher: repoFetcher});
    should.exist(deploy);

    deployer.checkout(deploy, function(err, data) {
      repoFetcher.Clone.calledWith(repoURL).should.be.true;
      done();
    });
  });
});
