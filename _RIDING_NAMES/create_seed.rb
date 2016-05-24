require 'pry'
require 'json'

file = File.read('constituencies_info.json')
riding_hash = JSON.parse(file)

outFile = "ridingNameSeed.sql"
open(outFile,'w') {|line|
  riding_hash.each do |element|
    line << "UPDATE members SET (riding_name) = \'#{element["ridingName"]}\' \n WHERE id = \'#{element["ridingID"]}\';\n"
  end
}
