var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(loopback.token());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module){
    var http_server = app.start();
    io  = require('socket.io')(http_server);

    io.on('connection', function(socket){
      socket.on('danmu', function(danmu){
        io.emit('danmu', danmu);
      });
    });
  }
});
