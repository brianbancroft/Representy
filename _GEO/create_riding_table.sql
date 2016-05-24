CREATE TABLE ridings( id INT PRIMARY KEY, name_en TEXT, name_fr TEXT, mp_id INT, party TEXT);
SELECT AddGeometryColumn('ridings','riding_geom',4326, 'MULTIPOLYGON',2);
