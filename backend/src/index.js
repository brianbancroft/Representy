var koa = require('koa');
var route = require('koa-route'); //require it
var json = require('koa-json');
var koaPg = require('koa-pg');
var pg = require('pg'); // .native;
var cors = require('koa-cors');
var paramify = require('koa-params');
var Bing = require('node-bing-api')({
    accKey: 'n5VJI9nk5QVMHDADXJwQTLY5eOS/lWgsuztVLWyIOTc'
});

pg.defaults.ssl = true;

route = paramify(route);
var param = route.param;
var get = route.get;

var app = koa();
app.use(cors());
app.use(koaPg('postgres://dkuuauoezstjor:Lr6qZtm1TlJHJJoellAJd5_Yni@ec2-54-227-245-222.compute-1.amazonaws.com:5432/d2imlo0f5r5jov'));

param('riding', function*(ridingid, next) {

    var query0 = 'SELECT  (ST_AsGeoJSON(geom)) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid; //analog - seek params[:id] analog with this library
    var result = yield this.pg.db.client.query_(query0)

    var query2 = 'SELECT  (riding_nam) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
    var ridingNameQuery = yield this.pg.db.client.query_(query2)

    var query3 = 'SELECT (party) FROM election_boundaries_joined_simp1 WHERE riding_id=' + ridingid;
    var partyNameQuery = yield this.pg.db.client.query_(query3)


    this.ridingName = ridingNameQuery.rows[0].riding_nam;
    this.geom = result.rows[0].st_asgeojson;
    this.partyName = partyNameQuery.rows[0].party;

    yield next;
});

param('coord', function*(coordinate, next) {
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

app.use(route.get('/samplenews', function*() {
    var results = ''

    Bing.news("Maxime Bernier", {
        top: 10, // Number of results (max 15)
        skip: 0, // Skip first 3 results
        newsSortBy: "Date", //Choices are: Date, Relevance
        newsCategory: "rt_Politics" // Choices are:
            //   rt_Business
            //   rt_Entertainment
            //   rt_Health
            //   rt_Politics
            //   rt_Sports
            //   rt_US
            //   rt_World
            //   rt_ScienceAndTechnology
            //newsLocationOverride: "US.WA" // Only for en-US market
    }, function(error, res, body) {
        console.log(body.d);
        results = body
    })



    this.body = {
        message: results
    }
}));



app.use(route.get('/members', function*() {
    var result = yield this.pg.db.client.query_('SELECT * FROM members')
    this.body = result.rows;
}));

app.use(route.get('/riding/:riding', function*() {
    this.body = {
        type: "Feature",
        properties: {
            ridingName: this.ridingName,
            partyName: this.partyName,
        },
        geometry: JSON.parse(this.geom)
    };
}));

app.use(route.post('/location/', function*() {
    console.log('post request has been made');
    // ridingNumber = this.riding;
    router.redirect('/location/', '/riding/673');

}))

app.use(json());

app.listen(3000);
console.log('Koa listening on port 3000');
