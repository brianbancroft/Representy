require 'twitter'
require 'pry'
require 'json'
require 'rest-client'
require 'json'
require 'pry'


# require_relative 'score_engagement.rb'




@client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "b1HRb0wLGXLT1ZJNSHuhJA5ce"
  config.consumer_secret     = "2bZAqKlyGhjW6FU3EOLmFIMpo1ajpnrgy0XGv4YhqnNwv2z2Bh"
  config.access_token        = "444219990-U2IYBdYC4W6N4tQuNgl49eXWrLXIWBAioXB7hwOC"
  config.access_token_secret = "U2RpWh0zYboBJQS1lI0oy6KlOFvOA8e2n5JHuJEs34VID"
  # config.consumer_key        = "E6ut0P8Bdig8RsvWByomuUiSQ"
  # config.consumer_secret     = "vvt9JY7B3tyf8PwE2vChADKW0sT553hiL9Z5gHTqbClp13MOd8"
  # config.access_token        = "1571155201-DGxRsqhbE43Y0NSTSgJv4ljL3mEorIMB12xDHit"
  # config.access_token_secret = "lRFb792fOQB8ERT9ND0xLruqL0nKPKsFGXoaXQ3l9inDJ"
  # config.consumer_key  =    "hTAv1i5Yz9W1QH2MA4KXGuVs9"
  # config.consumer_secret = "ohFl10cFfsXUL5Au9DC5wg5sjLH44vH8XIfyf1VhbsjEHOZ5RO"
  # config.access_token  =  "19713502-McmNigLbzV3PIqe1zR49pMx0thlFk7ylOIrGNytDh"
  # config.access_token_secret = "hPSfEsSiWcu6snCUxUZcf05ZxgPZmonZcRVbgmKSVN0tU"
end

json_file = File.read('open_parliament1.json')
json_data = JSON.parse(json_file)

twitter = []
data = []

# json_data.each do |i|

#   twitter.push(i['handle'])

# test = client.user_timeline(i['handle'])
# end


json_data.each do |mp|
  begin
    puts mp
  if mp['twitter_handle'] != nil
    @client.user_timeline(mp['twitter_handle'], {count: 50}).each do |tweet|
     puts (mp['twitter_handle'])
     puts tweet
     if tweet.text.length > 0 
        twitter_tweet = tweet.text
      else
        twitter_tweet = "N/A"
      end
      if tweet.quoted_status.text.length > 0
         twitter_quote = tweet.quoted_status.text
      else
         twitter_quote = "N/A"
      end
      mp_id = mp["mp_id"]
      data.push({
        "mp_id": mp_id,
        "text": twitter_tweet,
        "quoted_status": twitter_quote  
      })
    end
  end
  rescue Twitter::Error::TooManyRequests => error
  # rescue Twitter::Error::NotFound => error
    puts "TooManyRequests"
    sleep error.rate_limit.reset_in + 1
  rescue Twitter::Error::NotFound => error
    binding.pry
  rescue => e
    puts "Rescue : #{e}"
    # binding.pry
  rescue Timeout::Error => te
   puts "Rescued from timeout : #{te}"
   binding.pry
  end

  File.open("tweets1.json","w") do |f|
    f.write(data.to_json)
  end

end

# File.open("tweets4.json","w") do |f|
#   f.write(data.to_json)
# end



