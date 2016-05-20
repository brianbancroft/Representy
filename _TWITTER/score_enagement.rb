class Score_engagmenet

  def self.test(tweet)
    if tweet.text == '@' || tweet.text == '.' && tweet.text == '@'
      partcipation_count += 1
    elsif not tweet.quoted_status.text.nil?
      partcipation_count += 1
    end
    return partcipation_count
  end

end
