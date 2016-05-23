require 'twitter'
require 'pry'
require 'json'
require 'rest-client'
require 'json'
require 'pry'
require 'rubygems'


json_file = File.read('tweets1.json')
json_data = JSON.parse(json_file) 


counts = Hash.new(0)
json_data.each do |word|
  counts[word['mp_id']] += 1 
end

puts counts

# json_data.each do |tweet|


# counts.each do |x,y|

#   puts y 

# end

hash = []
# counts.each do |x, y|
  tweet_count = 0
  participation_count = 0
    json_data.each do |tweet|
     tweet_count +=1
     
      # puts tweet
      # if tweet['mp_id'] == x
      if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
        participation_count += 1
      elsif not tweet['quoted_status'] == "N/A"
        participation_count += 1
      end
      # puts tweet['mp_id']
    # end
total = 0
key = 0
counts.each do |x,y|
 key = x
 total = y
 if tweet_count == total
   tweet_count = 0
end
puts tweet_count
end
    if total == tweet_count
      # puts participation_count
       tweet_count = 0
    end

    puts participation_count
    puts y
    participation_count = (participation_count / y)
    puts participation_count
    tweet_count = 0
    participation_count = 0

    return participation_count
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
