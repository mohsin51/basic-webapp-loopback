let LoopBackContext = require('loopback-context');
let app = require('../server.js');
module.exports = function(options) {
    return function storeCurrentUser(req, res, next) {
      if (!req.accessToken) {
        return next();
      }
      
      app.models.user.findById(req.accessToken.userId, function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next();
        }
        var loopbackContext = LoopBackContext.getCurrentContext();
        if (loopbackContext) {
          loopbackContext.set('currentUser', user);
        }
        next();
      });
    };
  };