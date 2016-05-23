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

# json_data.each do |tweet|



hash = []
counts.each do |x, y|
participation_count = 0
tweet_count = 0
    json_data.each do |tweet|
     tweet_count +=1
      # puts tweet
      if tweet['mp_id'] == x
      if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
        participation_count += 1
      elsif not tweet['quoted_status'] == "N/A"
        participation_count += 1
      end
      puts participation_count
    end
    if tweet_count == y
    puts participation_count
    puts y
    participation_count = (participation_count / y).to_f
    puts participation_count
    tweet_count = 0
    # participation_count = 0

    # return participation_count
    end
  end
end








# end
    # puts tweets.class
    # tweets.each do |tweet|
      # puts tweet
#       # if tweet['mp_id'] = 
#       if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
#         participation_count += 1
#       elsif not tweet['quoted_status'] == "N/A"
#         participation_count += 1
#       end
#     #   puts participation_count
#     # end

#     # participation_count = (participation_count / tweet.length)
#     puts participation_count
#     # return participation_count
#   end
# end
