require 'pry'
require 'json'

def write_riding_seed(id, mp_id,mp_name, party,riding_name, riding_geom)
  string_ouput = "#{id},#{mp_id},\'#{mp_name}\',\'#{party}\',\'#{riding_name}\', ST_GeomFromGeoJSON(\'{\"type\":\"MultiPolygon\",\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:EPSG::4326\" } }, \"coordinates\":#{riding_geom}}\')"
end

geoFile = File.read('consolidated_shapefiles/full_elec_boundaries.geojson')
geo_hash = JSON.parse(geoFile)

binding.pry

open('ridings_seedv2.sql','w') {|sql_file|
  geo_hash["features"].each do |riding|
    sql_file << "INSERT INTO ridings (id, mp_id, mp_name,riding_name, party, riding_geom)\n"
    sql_file << "VALUES ("
    sql_file << write_riding_seed(riding["properties"]["constit_id"],riding["properties"]["MP_ID"],riding["properties"]["Name"],riding["Party"],riding["Riding_Nam"],riding["geometry"]["coordinates"])
    sql_file << ");\n"
  end

}
