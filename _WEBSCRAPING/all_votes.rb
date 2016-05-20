require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'
require 'uri'

doc = Nokogiri::HTML(open("https://openparliament.ca/votes/42-1/"))



json_file = File.read('mpsHashtest.json')

json_data = JSON.parse(json_file)

# puts json_data


votes_placed = []
vote_result = doc.css('.focus').children.css('li')

vote_result.each do |vote|
  # puts vote
  bill_vote = vote.css('a') 
  voting = vote.css('a').text.gsub("#","").gsub("C$", "").gsub("C-2", "").gsub("C-4","").gsub("C-10","").gsub("C-3","").gsub("C-15","").gsub("C-7","").gsub("C-8","").gsub("C-6","").gsub("C-9","").gsub("C-14","")
  votes_placed.push("https://openparliament.ca/votes/42-1/#{voting}/")
end
  
 votes_placed.sort!
 # puts votes_placed
# puts votes_placed
votes_placed.each do |bills|  
  vote_bill_hash = []
  bill_vote = URI(bills).path.split('/').last
  legis = Nokogiri::HTML(open(bills))
  legis_un = legis.css('.focus')
  legis_refined = legis.css('.focus li a')
    # bill_vote = ""
    # vote_result.each do |vote|
    #        bill_vote = vote.css('a').text
    #     end
  legis_refined.each do |item|
    # binding.pry
    # x = item.parent.parent.parent.parent.css('a:nth-child(9)').text
    mp_id = ""
    first_name = []
    last_name = []
    # binding.pry
    # binding.pry
       mp_name = item.children.text
       arr = mp_name.split(" ")
       first_name = arr[0]
       last_name = arr.last
    if item.parent.css('.tag').text == "Didn't vote"
       # binding.pry
       # puts arr
       # puts mp_name
       mp_vote = "N/A"
       json_data.each do |data|
        # puts data['name']
        # var y = mp_vote 
          if data['name'].include?(first_name) && data['name'].include?(last_name)
          # if (data['name']) =~ /#{mp_name}/
             mp_id = data['id']
             # puts "didnt vote"
             # puts mp_id
        end
       end

    elsif item.parent.css('.tag').text == "Yes"
       #  mp_name = item.children.text 
       # mp_name.split(" ")
       # puts mp_name
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if data['name'].include?(first_name) && data['name'].include?(last_name)
             mp_id = data['id']
             # puts "yes"
             # puts mp_id
          end
        end
    elsif item.parent.css('.tag').text == "No"
        # mp_name = item.children.text 
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if data['name'].include?(first_name) && data['name'].include?(last_name)
             mp_id = data['id']
             # puts "no"
             # puts mp_id 
          end
        end
    end

   vote_bill_hash.push({
      :mp_id => mp_id,
     :mp_name => mp_name,
     :vote => mp_vote,
     :bill_vote => bill_vote
      })
  
end




  vote_bill_hash.map { |o| Hash[o.each_pair.to_a] }.to_json


  File.open("voting_record.json","a") do |f|
    f.write(vote_bill_hash)
  end
   
end



# Mendès


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

