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
  json_data.each do |i|
    item << "INSERT INTO members (name, riding_id, mp_id)\n"
    item << "VALUES (\'#{i['ridingName']}'\, #{i['ridingID'].to_i}, #{i['mpID'].to_i});\n"
  end
}

