var koa = require('koa');
var route = require('koa-route'); //require it
var app = koa();
//and we'll set up 2 routes, for our index and about me pages
app.use(route.get('/', index));
app.use(route.get('/about', about));
app.listen(8008);
console.log('Koa listening on port 8008');

//The asterisk is key, designates a function as a generator.
function *index() {
  this.body = "<h1>Hello! This is my home page!</h1>";
}

function *about() {
  this.body = "<h2>My name is Adam and I like JavaScript</h2>";
}
