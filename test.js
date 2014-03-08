var express = require("express"),
    app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());

require("./authom-plus.js")(app);

var read = require('fs').readFileSync;

app.get('/', function(r, s){

    if(!app.isAuth(r))
      return s.end(read('./index.html'));

  	var obj = {
  		appIsAuth: app.isAuth(r),
  		appUsers: app.users
  	}
  	console.log('app.users: ', app.users);
  	console.log('app.isAuth(req): ', app.isAuth(r));

  	var resp = require('hogan.js').compile(read('main.html').toString()).render(obj);
  	s.end(resp);
})

app.listen(80);
console.log('http://localhost');