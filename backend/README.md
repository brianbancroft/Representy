# koa-pg

## TODO
Create a POST Request that redirects to the riding call

Sample SQL Query: SELECT ( riding_id) FROM election_boundaries_joined_simp1 WHERE ST_WITHIN(ST_GeomFromText('POINT( -79.395 43.644)'),geom);

## TODO: GET RIDINGID FROM CURRENT location



## TODO: Refine News API Call
1. Strip honourifics from name
2. Try to hone down the results to canadian politics



## troubleshooting

node debug src/index.js
use ```c``` to continue,
Once it stops at a breakpoint, writing repl.
