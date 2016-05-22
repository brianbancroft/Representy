require 'pry'
require 'json'


scrapeFile = File.read('constituencies_info.json')
riding_hash = JSON.parse(scrapeFile)

outFile = 'constit_info.csv'
open(outFile,'w') {|line|
  line << "Riding Name, Riding ID, Mp Name, MP ID, Party\n"
  riding_hash.each do |riding|
    line << "#{riding["ridingName"]},#{riding["ridingID"]},#{riding["mpName"]},#{riding["mpID"]},#{riding["party"]}\n"
  end
}
