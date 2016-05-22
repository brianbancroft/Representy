var koa = require('koa');
var route = require('koa-route'); //require it
var json = require('koa-json');
var koaPg = require('koa-pg');
var pg = require('pg'); // .native;
var cors = require('koa-cors');
var paramify = require('koa-params');
pg.defaults.ssl = true;

route = paramify(route);
var param = route.param;
var get = route.get;

var app = koa();
app.use(cors());
app.use(koaPg('postgres://dkuuauoezstjor:Lr6qZtm1TlJHJJoellAJd5_Yni@ec2-54-227-245-222.compute-1.amazonaws.com:5432/d2imlo0f5r5jov'));

param('riding',function*(ridingid,next) {

  var query0 = 'SELECT  (mp_id,ST_AsGeoJSON(geom)) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid; //analog - seek params[:id] analog with this library
  var geomQuery = yield this.pg.db.client.query_(query0)
  // var query1 = 'SELECT (mp_id) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
  // var mpIDQuery = yield this.pg.db.client.query_(query1)
  // var query2 = 'SELECT  (riding_nam) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
  // var ridingNameQuery = yield this.pg.db.client.query_(query2)
  // var query3 = 'SELECT (party) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
  // var partyNameQuery = yield this.pg.db.client.query_(query3)
  // var query4 = 'SELECT (name) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
  // var mpNameQuery = yield this.pg.client.query_(query4)

  // this.mpID = mpIDQuery.rows[0].mp_id;
  // this.ridingName = ridingNameQuery.rows[0].riding_nam;
  // this.geom = geomQuery.rows[0].st_asgeojson;
  // this.partyName = partyNameQuery.rows[0].riding_nam;
  // this.mpName = mpNameQuery.rows[0].name


  // this.ridingName = "riding name";
  // this.mpName = "mp_name";
  // this.partyName = "party_name";
  yield next;
});

param('coord', function*(coordinate,next) {
  console.log('Coord Call has been made');
  baseQuery = 'SELECT ( riding_id) FROM election_boundaries_joined_simp1 WHERE ST_WITHIN(ST_GeomFromText(\'POINT('
  endQuery = ')\'),geom);';
  var long = coordinate.split('&')[0];
  var lat = coordinate.split('&')[1];
  query = baseQuery + long + ' ' + lat + endQuery;
  var ridingNumber = yield this.pg.db.client.query_(query)
  this.riding = ridingNumber;

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
  // this.body = {
  //   type: "Feature",
  //   properties: {
  //     ridingName: this.ridingName,
  //     mpName: this.mpName,
  //     mpID: this.mpID,
  //     partyName: this.partyName,
  //   },
  //   geometry: JSON.parse(this.geom)
  // };
  this.body = "MP " + this.mpID + ", name: " + this.mpName ;
}));

app.use(route.post('/location/:long&lat', function*() {
  console.log('post request has been made');
  ridingNumber = this.riding;
  router.redirect('/location/:long&lat', '/riding/' + ridingNumber);

}))

app.use(json());

app.listen(3000);
console.log('Koa listening on port 3000');
