var should = require('chai').should();
var configParser = require('../lib/configParser');

describe('Config parser', function() {
  it('should parse ignored paths', function() {
    var configYaml = 'ignore: [ myDir ]';
    var config = configParser.parse(configYaml);
    config.ignoredPaths.should.include('myDir');
  });

  it('should have empty ignored paths on garbage data', function () {
    var bogusYaml = "alkjsd";
    var config = configParser.parse(bogusYaml);
    config.ignoredPaths.should.be.empty;
  });

  it('should parse multiple ignored paths', function() {
    var configYaml = 'ignore: [ .git, deploy, LICENSE, NOTICE, README.md, terraform]';
    var config = configParser.parse(configYaml);

    config.ignoredPaths.should.include('.git');
    config.ignoredPaths.should.include('deploy');
    config.ignoredPaths.should.include('LICENSE');
    config.ignoredPaths.should.include('NOTICE');
    config.ignoredPaths.should.include('README.md');
  });
});
