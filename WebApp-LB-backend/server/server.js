'use strict';
//
let clsHooked = require('cls-hooked');
//
var loopback = require('loopback');
var boot = require('loopback-boot');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');




var app = module.exports = loopback();

//To sign the cookies with this secret
app.use(cookieParser('Secret'));

app.set('views', path.join(__dirname, '../client'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use(loopback.token({
//   model: app.models.accessToken,
//   cookies: ['access-token'],
//   headers: ['access-token', 'X-Access-Token'],
//   params: ['access-token', 'access_token']
// }));

// "body-parser#json": {},
// "body-parser#urlencoded": { "params": { "extended": false}}


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // App.use middlewares here it will add all middlewares to routes phase 
  // app.use(require('./middleware/tokenParser')());
  

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();

});
