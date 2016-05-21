require 'json'
require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('voting_record.json')

json_data = JSON.parse(json_file)

# puts jsonarray

open('Voting_seed_SQL.SQL', 'w'){ |item|
  json_data.each do |i|
    item << "INSERT INTO members (mp_id, mp_name, vote, bill_voted_on)\n"
    item << "VALUES (\'#{i['mp_id']}'\, \'#{i['mp_name']}'\, \'#{i['vote']}'\, \'#{i['bill_vote']}\');\n"
  end
}

