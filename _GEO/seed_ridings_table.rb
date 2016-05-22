require 'pry'
require 'json'

def write_riding_seed(id, mp_id,mp_name, party,riding_name, riding_geom)
  #turns single quotes into litteral single quotes
  litteralize_single_quote(mp_name)
  litteralize_single_quote(party)
  litteralize_single_quote(riding_name)
  string_ouput = "#{id},#{mp_id},\'#{mp_name}\',\'#{party}\',\'#{riding_name}\', ST_GeomFromGeoJSON(\'{\"type\":\"MultiPolygon\",\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:EPSG::4326\" } }, \"coordinates\":#{riding_geom}}\')"
end

def litteralize_single_quote(string)
  string.gsub!("'", "") if not string.nil?
end

geoFile = File.read('consolidated_shapefiles/full_elec_boundaries.geojson')
geo_hash = JSON.parse(geoFile)

open('ridings_seedv2.sql','w') {|sql_file|
  geo_hash["features"].each do |riding|
    # binding.pry

    sql_file << "INSERT INTO ridings (id, mp_id, mp_name,riding_name, party, riding_geom)\n"
    sql_file << "VALUES ("
    sql_file << write_riding_seed(riding["properties"]["constit_id"],riding["properties"]["MP_ID"],riding["properties"]["Name"],riding["properties"]["Party"],riding["properties"]["Riding_Nam"],riding["geometry"]["coordinates"])
    sql_file << ");\n"
  end

}
