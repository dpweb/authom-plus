module.exports = function(app, configpath){

  if(configpath)
    configpath = __dirname + configpath;
  else;
    configpath = __dirname + '/authom.json';

  var config = require(configpath).authom;

  var authom = require("authom");

  for(service in config){
    authom.createServer(config[service]);
  }

  app.users = {};
  app.get('/logout', function(r, s, n){
      if(app.users[r.cookies.t]) 
        delete app.users[r.cookies.t];
      s.end('<script>location.href="/"</script>');
  })

  authom.on("auth", function(r, s, d){
      var tok = Math.random().toString(16).substring(2);
      app.users[tok] = d;
      s.writeHead(200, {
        'Set-Cookie': 't='+tok+';Path=/;'
      });
      s.end('<script>location.href="/"</script>');
      s.end();
  });

  app.isAuth = function(r){
    return app.users[r.cookies.t];
  }

  authom.on("error", function(req, res, data){
     console.log("Authom error: " + JSON.stringify(data));
  })

  app.get("/auth/:service", authom.app);
  return authom;
}