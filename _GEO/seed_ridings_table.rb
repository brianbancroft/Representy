require 'pry'
require 'json'

def write_riding_seed()
  string_ouput = ""
end

geoFile = File.read('full_elec_bdys.geojson')
geo_hash = JSON.parse(geoFile)

scrapeFile = File.read('constituencies_info.json')
riding_hash = JSON.parse(scrapeFile)
binding.pry


open('ridings_seed.sql','w') {|file|
  f << "INSERT INTO ridings (id, name_en, name_fr,mp_id, party, geom)\n"
  f << "VALUES ("
  f << write_mp_seed()
  f << ");"


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
