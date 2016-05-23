# require 'math'
require 'twitter'
require 'pry'
require 'json'
require 'rest-client'
require 'json'
require 'pry'
require 'rubygems'


json_file = File.read('tweets1.json')
json_data = JSON.parse(json_file) 


# puts json_data
class Stuff
  include Math

  def self.getParticipationCount(tweets)
    puts tweets.class
    participation_count = 0
    tweets.each do |tweet|
      puts tweet
      # if tweet['mp_id'] = 
      if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
        participation_count += 1
      elsif not tweet['quoted_status'] == "N/A"
        participation_count += 1
      end
      puts participation_count
    end
    counts = Hash.new 0
    json_data.each do |word|
    counts[word['mp_id']] += 1 
    end
    participation_count = (participation_count / tweets.length)
    puts participation_count
    return participation_count
  end


  #Supporter Math Functions - taken from http://stackoverflow.com/questions/7749568/how-can-i-do-standard-deviation-in-ruby.
  def self.sum
    self.inject(0){|accum, i| accum + i }
  end

  def self.mean
    self.sum/self.length.to_f
  end

  def self.sample_variance
    m = self.mean
    sum = self.inject(0){|accum, i| accum +(i-m)**2 }
    sum/(self.length - 1).to_f
  end

  def self.standard_deviation
    return MATH.sqrt(self.sample_variance)
  end

  # Takes in a list of engagement scores ()
  def self.normalize_scores(engagement_scores)
    normalized_scores = []
    #Calculate Mean and Standard Deviation
    mean = 0
    stddev = 0

    engagement_scores.each do |score|
      normalized_scores.push(Math.abs(score-mean)/stddev)
  end
    return normalized_scores
  end

end


# sum Stuff.getParticipationCount(json_data)
=begin


h = Hash.new(0)
json_data.each { | v | h.store(v, h[v]+1) }
puts h

=end

counts = Hash.new 0

json_data.each do |word|
  counts[word['mp_id']] += 1 
end
puts counts.values

  # Stuff.getParticipationCount(json_data)


# .map look for properties inside of each tweet that matches the id 

# array.length or array.size