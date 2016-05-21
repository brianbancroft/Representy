require 'twitter'
require 'pry'
require 'json'
require 'rubygems'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "b1HRb0wLGXLT1ZJNSHuhJA5ce"
  config.consumer_secret     = "2bZAqKlyGhjW6FU3EOLmFIMpo1ajpnrgy0XGv4YhqnNwv2z2Bh"
  config.access_token        = "444219990-U2IYBdYC4W6N4tQuNgl49eXWrLXIWBAioXB7hwOC"
  config.access_token_secret = "U2RpWh0zYboBJQS1lI0oy6KlOFvOA8e2n5JHuJEs34VID"
end

# binding.pry



json_file = File.read('twitter.json')

json_data = JSON.parse(json_file)





twitter = []

json_data.each do |i| 

  twitter.push(i['handle'])

# test = client.user_timeline(i['handle'])
end


puts twitter.first



# def collect_with_max_id(collection=[], max_id=nil, &block)
#   response = yield(max_id)
#   collection += response
#   response.empty? ? collection.flatten : collect_with_max_id(collection, response.last.id - 1, &block)
# end

# def client.get_all_tweets(user)
#   collect_with_max_id do |max_id|
#     options = {count: 10}
#     options[:max_id] = max_id unless max_id.nil?
#     user_timeline(user, options)
#   end
# end

# binding.pry
puts client.get_all_tweets("#{twitter.first}")




# to get the text, it's tweetvariable[i].text


# if tweet.text[0] == '@' || tweet.text[0] == '.' && tweet.text[1] == '@'
#   partcipation_count += 1
# elsif not tweet.quoted_status.text.nil?
#   partcipation_count += 1
# end


