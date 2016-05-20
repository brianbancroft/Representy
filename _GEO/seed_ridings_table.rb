require 'pry'
require 'json'

def write_riding_seed(id, name_en, name_fr,mp_id, party, riding_geom)
  string_ouput = "#{id},\'#{name_en}\',\'#{name_fr}\',#{mp_id},\'#{party}\', ST_GeomFromGeoJSON(\'{\"type\":\"MultiPolygon\",\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:EPSG::4326\" } }, \"coordinates\":#{riding_geom}}\')"
end

geoFile = File.read('ridings_simplified.geojson')
geo_hash = JSON.parse(geoFile)

scrapeFile = File.read('constituencies_info.json')
riding_hash = JSON.parse(scrapeFile)

open('ridings_seed.sql','w') {|sql_file|
  geo_hash["features"].each do |riding|
    support_file = riding_hash.select { |element| element["ridingID"].to_i == riding["properties"]["constit_id"] }[0]
    sql_file << "INSERT INTO ridings (id, name_en, name_fr,mp_id, party, riding_geom)\n"
    sql_file << "VALUES ("
    sql_file << write_riding_seed(riding["properties"]["constit_id"],riding["properties"]["ENNAME"],riding["properties"]["FRNAME"],support_file["mpID"],support_file["party"],riding["geometry"]["coordinates"])
    sql_file << ");\n"
  end

}
