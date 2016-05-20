var koa = require('koa');
var route = require('koa-route'); //require it
var json = require('koa-json');
var koaPg = require('koa-pg');
var pg = require('pg');
var cors = require('koa-cors');
var paramify = require('koa-params');
pg.defaults.ssl = true;

route = paramify(route);
var param = route.param;
var get = route.get;

var app = koa();
app.use(cors());
app.use(koaPg('postgres://dkuuauoezstjor:Lr6qZtm1TlJHJJoellAJd5_Yni@ec2-54-227-245-222.compute-1.amazonaws.com:5432/d2imlo0f5r5jov'));

param('riding',function*(ridingid,next){
  var query = 'SELECT name, ST_AsGeoJSON(geom) FROM testgeom WHERE id=' + ridingid; //analog - seek params[:id] analog with this library
  var riding = yield this.pg.db.client.query_(query)
  this.riding = riding.rows[0].st_asgeojson;
  yield next;
});

app.use(function*(next) {
    yield next;
});

app.use(route.get('/', function*() {
    this.body = {
        message: 'hello world'
    }
}));

app.use(route.get('/members', function*() {
  var result = yield this.pg.db.client.query_('SELECT * FROM members')
  this.body = result.rows;
}));

app.use(route.get('/riding/:riding', function*() {
  this.body = this.riding;
  console.log("I'm a change");
}));

// app.use(route.get('/sampleJSON', sampleJSON));
// app.use(route.get('/riding',riding));
app.use(json());

// SQLLOCATION = 'postgres://dkuuauoezstjor:Lr6qZtm1TlJHJJoellAJd5_Yni@ec2-54-227-245-222.compute-1.amazonaws.com:5432/d2imlo0f5r5jov';
// app.use(koaPg(SQLLOCATION));


app.listen(3000);
console.log('Koa listening on port 3000');

//The asterisk is key, designates a function as a generator.
// function* index() {
//     this.body = "<h1>Hello! This is the home page!</h1>";
//     console.log('whoa');
// }
//
// function* sampleJSON() {
//     this.body = {
//         foo: 'bar'
//     };
//
// }
//
// function* riding() {
//     this.body = "<h2>This is the ridings page</h2>";
// }
