'use strict';
module.exports = function(app) {
  let LoopBackContext = require('loopback-context');

  let router = app.loopback.Router();

  router.get('/', (req,res,next) => {
    let ctx = LoopBackContext .getCurrentContext();
    if(ctx === null)
    {
      res.render("index", {siteTitle : "FreeBooks"});
    }
    else
    {
      let userObj = ctx.get('currentUser');
      if(!userObj)
      {
         res.render("index", {siteTitle:"FreeBooks"});
      }
      else
      {
        res.render("index", {siteTitle:"FreeBooks", user:userObj});
      }
    }
  });
  app.use(router);
};
