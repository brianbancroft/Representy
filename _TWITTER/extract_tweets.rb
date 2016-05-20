require 'twitter'
require 'pry'
require 'json'
require 'rubygems'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

require_relative 'score_engagement.rb'


client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "b1HRb0wLGXLT1ZJNSHuhJA5ce"
  config.consumer_secret     = "2bZAqKlyGhjW6FU3EOLmFIMpo1ajpnrgy0XGv4YhqnNwv2z2Bh"
  config.access_token        = "444219990-U2IYBdYC4W6N4tQuNgl49eXWrLXIWBAioXB7hwOC"
  config.access_token_secret = "U2RpWh0zYboBJQS1lI0oy6KlOFvOA8e2n5JHuJEs34VID"
end

binding.pry

## Sample Hash: namesHash
mid_array = []

namesHash.each do |poli_twerp|

  # get list of tweets
  tweetList = client.user_timeline(poli_twerp, {count:70})
  # For list of counts, do something
  engagementCount = Score_engagement::getParticipationCount(tweetList)
  # Otherwise, do something else.

  # That's it.


end

# test = client.user_timeline("jkenney",{count:200})

#to get the text, it's tweetvariable[i].text
