var koa = require('koa');
var route = require('koa-route'); //require it
var json = require('koa-json');
var koaPg = require('koa-pg');
var pg = require('pg'); // .native;
var cors = require('koa-cors');
var paramify = require('koa-params');
var Promise = require('bluebird').Promise;
// var Bing = require('node-bing-api')({
//     accKey: 'n5VJI9nk5QVMHDADXJwQTLY5eOS/lWgsuztVLWyIOTc'
// });
var Bing = Promise.promisifyAll(require('node-bing-api')({
    'accKey': 'n5VJI9nk5QVMHDADXJwQTLY5eOS/lWgsuztVLWyIOTc'
}),{
  suffix: 'Async'
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

param('name', function*(name, next) {

    console.log("okay, we're starting this here!")
    // 1. Here, we promisfied the Bing Library (see the includes), and it
    // has a suffix of "Async". this means that every single method in that bing library has a second
    // Async Method (capital A), which then returns a promise. This helps us nail down the flow control.
    // 2. When we yield to a promise, it returns a value instead of the promise. It's no longer holding the value
    // inside the promise. The yield returns the value - ~This is kinda a big deal.
    // 3. Because we're using yield, we halt the execution of the function until the yield returns. This is the real value of yields.
    // 4. This.name refers to the param to the left of "next". Here, we assign the value

    this.name =  yield Bing.newsAsync(name, {
        top: 10, // Number of results (max 15)
        skip: 0, // Skip first 3 results
        newsSortBy: "Date", //Choices are: Date, Relevance
        newsCategory: "rt_Politics" // Choices are:
    });

    yield next;

})

app.use(function*(next) {
    yield next;
});

app.use(route.get('/', function*() {
    debugger;
    console.log('hello world page')
    this.body = {
        message: 'hello world'
    }
}));

app.use(route.get('/news/:name', function*() {
    this.body = {
        results: this.name
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
