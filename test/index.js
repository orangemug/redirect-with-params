var assert  = require("assert");
var express = require("express");
var request = require("superagent");

var redirectWithParam = require("../");

describe("redirect-with-params", function() {
  var app, routeCalled, url;

  beforeEach(function(done) {
    app = express();
    routeCalled = false;

    app.get('/users/:id', function (req, res) {
      routeCalled = true;
      res.sendStatus(200);
    })

    app.get('/me/:id', redirectWithParam("/users/:id"));

    var server = app.listen(0, function () {
      var a = server.address();
      url = "http://"+a.address+":"+a.port+"";
      done();
    });
  });

  it("should redirect", function(done) {
    assert(!routeCalled);
    request
      .get(url+"/me/12")
      .end(function() {
        assert(routeCalled);
        done();
      });
  });

  it("should still be able to hit original url", function(done) {
    assert(!routeCalled);
    request
      .get(url+"/users/12")
      .end(function() {
        assert(routeCalled);
        done();
      });
  });

});

