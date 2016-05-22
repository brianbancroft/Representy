require 'json'
require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('OPMpinfo.json')

json_data = JSON.parse(json_file)

json_file_two = File.read('mpsHashtest.json')
json_data_two = JSON.parse(json_file_two)

open_parliament_hash = []

json_data.each do |item|
  mp_id = ""
  mp_name = item["name"]
  arr = mp_name.split(" ")
  first_name = arr[0]
  last_name = arr.last
  json_data_two.each do |data|
    if data['name'].include?(first_name) && data['name'].include?(last_name)
       mp_id = data['id'].to_i
    end
  end
  if item["other_info"]["twitter"] != nil
    twitter_handle = twitter = item["other_info"]["twitter"][0] 
  end
  if item["other_info"]["wordcloud"] != nil 
    word_cloud = item["other_info"]["wordcloud"][0]
  end
  if item["other_info"]["favourite_word"] != nil 
    favourite_word = item["other_info"]["favourite_word"][0]
  end
  open_parliament_hash.push({
     "mp_id": mp_id,
     "twitter_handle": twitter_handle,
     "word_cloud": word_cloud,
     "favourite_word": favourite_word
  })  
end


File.open("open_parliament.json","w") do |f|
  f.write( open_parliament_hash.to_json)
end


