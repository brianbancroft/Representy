require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'
require 'uri'

doc = Nokogiri::HTML(open("https://openparliament.ca/votes/42-1/"))



json_file = File.read('mpsHashtest.json')

json_data = JSON.parse(json_file)


votes_placed = []
vote_result = doc.css('.focus').children.css('li')

vote_result.each do |vote|
  bill_vote = vote.css('a') 
  voting = vote.css('a').text.gsub("#","").gsub("C$", "").gsub("C-2", "").gsub("C-4","").gsub("C-10","").gsub("C-3","").gsub("C-15","").gsub("C-7","").gsub("C-8","").gsub("C-6","").gsub("C-9","").gsub("C-14","")
  votes_placed.push("https://openparliament.ca/votes/42-1/#{voting}/")
end
  
votes_placed.sort!

  vote_bill_hash = []

votes_placed.each do |bills|  
  bill_vote = URI(bills).path.split('/').last
  legis = Nokogiri::HTML(open(bills))
  legis_un = legis.css('.focus')
  legis_refined = legis.css('.focus li a')
  legis_refined.each do |item|
    mp_id = ""
    first_name = []
    last_name = []
       mp_name = item.children.text
       arr = mp_name.split(" ")
       first_name = arr[0]
       last_name = arr.last
    if item.parent.css('.tag').text == "Didn't vote"
       mp_vote = "N/A"
       json_data.each do |data|
          if data['name'].include?(first_name) && data['name'].include?(last_name)
             mp_id = data['id']
        end
       end

    elsif item.parent.css('.tag').text == "Yes"
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if data['name'].include?(first_name) && data['name'].include?(last_name)
             mp_id = data['id']
          end
        end
    elsif item.parent.css('.tag').text == "No"
        mp_vote = item.parent.css('.tag').text
        json_data.each do |data|
          if data['name'].include?(first_name) && data['name'].include?(last_name)
             mp_id = data['id']
          end
        end
    end

   vote_bill_hash.push({
     "mp_id": mp_id,
     "mp_name": mp_name,
     "vote": mp_vote,
     "bill_vote": bill_vote
      })
  
end

  # vote_bill_hash.map { |o| Hash[o.each_pair.to_a] }.to_json


end


File.open("voting_record.json","w") do |f|
  f.write(vote_bill_hash.to_json)
end


