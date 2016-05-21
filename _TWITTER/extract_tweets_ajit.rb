require 'twitter'
require 'pry'
require 'json'
require 'rubygems'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

# require_relative 'score_engagement.rb'


client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "E6ut0P8Bdig8RsvWByomuUiSQ"
  config.consumer_secret     = "vvt9JY7B3tyf8PwE2vChADKW0sT553hiL9Z5gHTqbClp13MOd8"
  config.access_token        = "1571155201-DGxRsqhbE43Y0NSTSgJv4ljL3mEorIMB12xDHit"
  config.access_token_secret = "lRFb792fOQB8ERT9ND0xLruqL0nKPKsFGXoaXQ3l9inDJ"
end

# binding.pry

json_file = File.read('twitter.json')

json_data = JSON.parse(json_file)





twitter = []

json_data.each do |i| 

  twitter.push(i['handle'])

# test = client.user_timeline(i['handle'])
end


# puts twitter.first



def collect_with_max_id(collection=[], max_id=nil, &block)
  response = yield(max_id)
  collection += response
  response.empty? ? collection.flatten : collect_with_max_id(collection, response.last.id - 1, &block)
end

def client.get_all_tweets(user)
  collect_with_max_id do |max_id|
    options = {count: 1, include_rts: false}
    options[:max_id] = max_id unless max_id.nil?
    user_timeline(user, options)
  end
end

# binding.pry
puts client.get_all_tweets("#{twitter.first}")


putting data into a json File


   vote_bill_hash.push({
     :mp_id => mp_id,
     :mp_name => mp_name,
     :vote => mp_vote,
     :bill_vote => bill_vote
   })


  vote_bill_hash.map { |o| Hash[o.each_pair.to_a] }.to_json

  File.open("voting_record.json","a") do |f|
    f.write(vote_bill_hash)
  end


@ is a normal reply 
how many of them @ public reply . @ 

how many of them are quote rewtweets





# to get the text, it's tweetvariable[i].text


# if tweet.text[0] == '@' || tweet.text[0] == '.' && tweet.text[1] == '@'
#   partcipation_count += 1
# elsif not tweet.quoted_status.text.nil?
#   partcipation_count += 1
# end


# test = client.user_timeline("jkenney",{count:200})

#to get the text, it's tweetvariable[i].text


