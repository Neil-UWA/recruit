module.exports = function(server) {
  var router = server.loopback.Router();

  router.get('/', function(req, res, next){
    res.sendFile(process.env.PWD+'/client/index.html');
  });

  server.use(router);
};
