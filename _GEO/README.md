# Geography Files
In this directory lie all the geography-related file for each riding.

## ALL RIDINGS MAP DATA
The required hata has been created, and needs to be uploaded to Mapbox. It contains the following fields:

## SQL UPLOADS to PG
The required data exists, but still needs to be consolidated into .geojson and converted into a seed
1. Convert into JSON
2. Convert Into a Seed File
3. Upload into PG

## Tutorial Bits
###Using OGR2OGR:Convert from Shapefile to GeoJSON
ogr2ogr -f "GEOJSON" output input

Command for Adding New Table:
```SQL
findmymp=# CREATE TABLE RIDINGS
(id INTEGER PRIMARY KEY,
mp_id INTEGER,
party TEXT,
mp_name TEXT,
riding_name TEXT);
```

Command For Adding Geometry Field; ```findmymp=# SELECT AddGeometryColumn ('ridings', 'the_geom', 4326, 'MULTIPOLYGON', 2);```
