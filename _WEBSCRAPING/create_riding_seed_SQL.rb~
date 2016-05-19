require 'json'
require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('constituencies_info.json')

json_data = JSON.parse(json_file)

# puts jsonarray

open('Riding_seed.SQL', 'w'){ |item|
  item << "INSERT INTO members (name, special_riding_id, special_mp_id, polygon)"
  json_data.each do |i|
    item << "VALUES ({\'#{i['ridingName']}'\, \'#{i['ridingID']}'\, \ '#{i['mpID']}' \ }),\n"
  end
}



