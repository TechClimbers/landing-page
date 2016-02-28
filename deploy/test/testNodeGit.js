var chai = require('chai');
var should = chai.should();
chai.use(require('chai-things'));

var fs = require('fs');
var git = require('nodegit');
var temp = require('temp').track();

describe('Temp module', function() {
  it('should create a temporary directory', function(done) {
    temp.mkdir('landing-page', function(err, dirPath) {
      should.not.exist(err);
      fs.stat(dirPath, function(err, stats) {
        should.exist(stats);
        stats.isDirectory().should.be.true;
        done();
      });
    });
  });
});

describe('Git clone', function() {
  it('should clone a repo to the tmp directory', function (done) {
    this.timeout(20000);
    should.exist(git);
    temp.mkdir('landing-page', function(err, dirPath) {
      git.Clone("https://github.com/TechClimbers/landing-page.git", dirPath).then(function(repo) {
        fs.stat(dirPath + '/.git/', function(err, stats) {
          should.not.exist(err);
          stats.isDirectory().should.be.true;
          done();
        });
      });
    });
  });
});
