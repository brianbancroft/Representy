require 'math'


class Score_engagmenet
  def self.getParticipationCount(tweets)
    participation_count = 0
    tweets.each do |tweet|
      if tweet['text'][0] == '@' || tweet['text'][0] == '.' && tweet['text'][1] == '@'
        participation_count += 1
      elsif not tweet.quoted_status.text.nil?
        participation_count += 1
      end
    end
    participation_count = (participation_count / tweets.length)
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
    return Math.sqrt(self.sample_variance)
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
