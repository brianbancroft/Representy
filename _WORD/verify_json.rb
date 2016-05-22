require 'pry'
require 'json'
require 'open-uri'

url_base = "http://api.openparliament.ca/politicians/"
url_end = "/?format=json"


input_hash = File.read('openParliamentMpHash.txt')
File.open('convertedjson.json','w') do |f|
  f.write(input_hash.to_json)
end

output_json = File.read('convertedjson.json') 

binding.pry


# File.open(yourfile, 'w') { |file| file.write("your text") }

