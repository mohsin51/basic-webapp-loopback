
let app = require('../server.js');
module.exports = function() {
    return function clearCache(req, res, next) {
     res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
     res.set('Expires', '-1');
     res.set('Pragma', 'no-cache');
     next();
    };
  };
