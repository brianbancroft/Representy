require 'json'
require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('sponsored_bills.json')

json_data = JSON.parse(json_file)

# puts jsonarray

open('sponsored_bills_seed_SQL.SQL', 'w'){ |item|
  json_data.each do |i|
    item << "INSERT INTO members (existence, mp_name, mp_id, bill_number, descriptionEN, descriptionFR, dateIntroduced, legisinfoID)\n"
    item << "VALUES (\'#{i['billInfo']}'\, \'#{i['mpName']}'\, #{i['mp_id'].to_i}, \'#{i['billNumber']}'\, \'#{i['descriptionEN']}'\, \'#{i['descriptionFR']}'\, \'#{i['dateIntroduced']}'\, #{i['legisinfoID']});\n"
  end
}

