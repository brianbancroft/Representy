require 'pry'
require 'json'

def write_riding_seed(id, name_en, name_fr,mp_id, party, riding_geom)
  string_ouput = "#{id},\'#{name_en}\',\'#{name_fr}\',#{mp_id},\'#{party}\',ST_GeomFromGeoJSON(#{riding_geom})"
end

geoFile = File.read('ridings.geojson')
geo_hash = JSON.parse(geoFile)

scrapeFile = File.read('constituencies_info.json')
riding_hash = JSON.parse(scrapeFile)

open('ridings_seed.sql','w') {|sql_file|
  geo_hash["features"].each do |riding|
    support_file = riding_hash.select { |element| element["ridingID"].to_i == riding["properties"]["constit_id"] }[0]
    sql_file << "INSERT INTO ridings (id, name_en, name_fr,mp_id, party, riding_geom)\n"
    sql_file << "VALUES ("
    sql_file << write_riding_seed(riding["properties"]["constit_id"],riding["properties"]["ENNAME"],riding["properties"]["FRNAME"],support_file["mpID"],support_file["party"],riding["geometry"])
    sql_file << ");\n"
  end

}

#### Attributes for GEOJSON File:

# riding name en: geo_hash["features"][4]["properties"]["ENNAME"]
# Riding name fr: geo_hash["features"][4]["properties"]["FRNAME"]
# parl.gc.ca Riding ID: geo_hash["features"][4]["properties"]["constit_id"]
# Geometry: geo_hash["features"][4]["geometry"]


#### Attributes for scraped file:
# riding ID: riding_hash[0]["ridingID"]
# mpName: riding_hash[0]["mpName"]
# MP ID: riding_hash[0]["mpID"]
# Riding Party: riding_hash[0]["party"]
