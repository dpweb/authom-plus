authom-plus
===========

###Setup

Create authom.json
````
{
	"authom": [
	  {
    	"service": "twitter",
    	"id": "CieWj2i6spcw5zNgtk9Rkg",
    	"secret": "f2Tow4oOUjH775gcLzQmJh8e8kpBC6Ki5UFrjcHvg"
      }
	]
}

$ npm install dpweb/authom-plus
$ node test
````
###HTML
````
<a href="/auth/twitter"><img class="twitter"></img></a>

<a href="/logout" >logout</a>
````

###Server
Decorates express app:    

app.users = {...}
app.isAuth(req) = {...} || null;

````
var express = require("express"),
    app = express();
app.use(express.cookieParser());
app.use(express.bodyParser());

require("./authom-plus.js")(app);

/*  or use alternate config file
require("./authom-plus.js")(app, 'config.json');
*/

app.get('/', function(r, s){

	// failed
    if(!app.isAuth(r))
      return s.end(read('./index.html'));

    // passed

  	// app.isAuth(r)
  	// app.users

  	var resp = require('hogan.js').compile(...).render(...);
  	s.end(resp);
})

app.listen(80);
console.log('http://localhost');
````