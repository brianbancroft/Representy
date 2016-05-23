require 'twitter'
require 'pry'
require 'json'
require 'rest-client'
require 'json'
require 'pry'
require 'rubygems'


json_file = File.read('tweets1.json')
json_data = JSON.parse(json_file) 


counts = Hash.new 0
json_data.each do |word|
  counts[word['mp_id']] += 1 
end

participation_count = 0
json_data.each do |tweet|
    # puts tweets.class
    # tweets.each do |tweet|
      # puts tweet
      # if tweet['mp_id'] = 
      if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
        participation_count += 1
      elsif not tweet['quoted_status'] == "N/A"
        participation_count += 1
      end
    #   puts participation_count
    # end
  
    participation_count = (participation_count / tweets.length)
    puts participation_count
    return participation_count
  end
