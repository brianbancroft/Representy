require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'
require 'uri'



json_file = File.read('voting_record.json')

json_data = JSON.parse(json_file)

# puts json_data << 

json_file_two = File.read('mpsHashtest.json')

json_data_two = JSON.parse(json_file_two)

# puts json_data

# puts json_data_two

# puts json_data << json_file_two['party'] if json_file['mp_id'] == json_file_two['id']


# json_data.each do |json|
#   if json_data_two.select {|x| x['id'] === json['mp_id']}
#     json_data.merge(:party => json['party'])
#   end
#   puts json_data
#   # find object in json_data_two that has id of json['xssmp_id']

#   # add the party with json['party'] = json_data_two_result_that_you_found['party']
# end

# voting_info = []
voting_info = json_data.map do |x|
  x['party'] = json_data_two.select {|y| y['id'] == x['mp_id']}.first['party']
  x
end

  # yes = 0
  # no = 0
  # abs = 0

voting_info.each do |data|
  # if data['bill_vote'] 


  # data['bill_vote'].each do |item|
    if data['party'] == "NDP" && data["bill_vote"] == "9"
      # if data["vote"] === "Yes"
        puts data["vote"]
        puts data['mp_id']
      # end
    end
    #     yes += 1
    #   elsif data["vote"] == "No"
    #       no += 1
    #   else
    #     abs +=1
    #   end
    # end
  # end
end

# puts yes

#   if party_vote['party'] == "NDP"
#     puts party_vote
#   end
# end
 




# puts json_data['mp_id']



  mp_party = []
#   json_data_two.each do |y|
#     voting_info << y['party'] << x['vote'] << x['bill_vote'] << x['mp_id'] << y['id'] if x['mp_id'] == y['id']
#   end
#   puts voting_in
#   puts mp_party
#   bill = x['bill_vote']
#   bill.each do |vote|
#     puts vote
#   if x['vote'] === "Yes" 
#       if (mp_party[0]).include?(x['mp_id'])
#       puts x['bill_vote']
#       puts x['vote']
#       puts "-----"
#       puts mp_party
# end
