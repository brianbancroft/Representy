require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

doc = Nokogiri::HTML(open("https://openparliament.ca/votes/42-1/"))



json_file = File.read('mpsHash.json')

json_data = JSON.parse(json_file)

voter_bill_hash = []

votes_placed = []
vote_result = doc.css('.focus').children.css('li')

vote_result.each do |vote|
  # puts vote
  bill_vote = vote.css('a') 
  voting = vote.css('a').text.gsub("#","").gsub("C$", "").gsub("C-2", "").gsub("C-4","").gsub("C-10","").gsub("C-3","").gsub("C-15","").gsub("C-7","").gsub("C-8","").gsub("C-6","").gsub("C-9","").gsub("C-14","")
  
  votes_placed.push("https://openparliament.ca/votes/42-1/#{voting}/")
end
  # votes_placed.each do |bills|  
  legis = Nokogiri::HTML(open("https://openparliament.ca/votes/42-1/20/"))
  legis_refined = legis.css('.focus li a')
  legis_refined.each do |item|
    # x = item.parent.parent.parent.parent.css('a:nth-child(9)').text
    mp_id = ""
    # binding.pry
    # binding.pry
    if item.parent.css('.tag').text === "Didn't Vote"
       mp_name = bill vote item.children.text
       mp_vote = puts item.parent.css('.tag').text
       json_data.each do |data|
        var y = mp_vote 
          if (data['name']) =~ /#{mp_name}/
             mp_id = data['id']
        end
       end

    elsif item.parent.css('.tag').text === "Yes"
        mp_name = item.children.text 
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if (data['name']) =~ /#{mp_name}/
             mp_id = data['id']
          end
        end
    elsif item.parent.css('.tag').text === "No"
        mp_name = item.children.text 
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if (data['name']) =~ /#{mp_name}/
             mp_id = data['id']
          end
       end
    end

    # .split(first and last name )
   #    sponsored_bill_hash.push({
   #     :mpName => mp_name,
   #     :billInfo => bill_exist,
   #     :mp_id => mp_id,
   #     })
   #  else
   #    sponsored_bill_hash.push({
   #      :billInfo => bill_exist,
   #      :mpName => mp_name,
   #      :mp_id => mp_id,
   #      :billNumber => bill_number,
   #      :descriptionEN => bill_english,
   #      :descriptionFR => bill_french,
   #      :dateIntroduced => bill_introduce_date,
   #      :legisinfoID => bill_legisinfo_id,
   #  })
   #  end

    puts mp_id
    puts mp_name
    puts mp_vote
end


  # if item.children.css(tag).text === "YES"
      # puts item.css('.focus li .voteresult_Y')
      # puts item.css('.focus li a').children
  # end
# end
  # puts item.css('.focus li a').children
#   puts item.css('.focus li .voteresult_Y')
# end
  # binding.pry
  # puts legis.css('.focus li .voteresult_N')
  # puts legis.css('.focus li .voteresult_A')

# end




# ('.six twoline overflowtip')


# vote_list =



# json_file = File.read('mpsHash.json')

# json_data = JSON.parse(json_file)

# committee_list = doc.css('#TABLE > tr:nth-child(n+2):nth-child(-n+24) > td:nth-child(1)')


# committee_list.each do |data| 
#   committee_hash = []
#   output = []
#   output2 =[]

#   # comm = data.children[1].children[1].css('b').text()
#   # puts comm
#   title = data.children[1].children[1].css('b').text()
#   members = data.children[3].children[3].children.children
#   associate_members = data.children[5].children[3].children.children
#   puts title
#   mp_id = ""
#   committee_title = ""

