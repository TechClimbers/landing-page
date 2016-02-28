var chai = require('chai');
var should = chai.should();
chai.use(require('chai-things'));

var AWS = require('aws-sdk');

describe('aws test', function() {
  it('should list the buckets in S3', function(done) {
    var s3 = new AWS.S3();
    s3.should.not.be.null;

    s3.listBuckets(function(err,data) {
      data.should.have.property('Buckets');
      done();
    });
  });

  it('should find the techclimbers.com bucket', function(done) {
    var s3 = new AWS.S3();
    s3.listBuckets(function(err, data) {
      data.Buckets.should.contain.an.item.with.property('Name', 'techclimbers.com');
      done();
    });
  });

  it('should find the www.techclimbers.com bucket', function(done) {
    var s3 = new AWS.S3();
    s3.listBuckets(function(err, data) {
      data.Buckets.should.contain.an.item.with.property('Name', 'www.techclimbers.com');
      done();
    });
  });

  it('should create a temporary bucket for testing', function(done) {
    var bucketName = "myTestBucket.techclimbers.com";
    var s3 = new AWS.S3();
    s3.createBucket({Bucket: bucketName}, function(err, data) {
      should.not.exist(err);
      s3.deleteBucket({Bucket: bucketName}, function(err, data) {
        should.not.exist(err);
        done();
      });
    });
  });
});
