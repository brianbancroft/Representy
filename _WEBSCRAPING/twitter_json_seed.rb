require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'
require 'uri'

doc = Nokogiri::HTML(open("http://politwitter.ca/page/canadian-politics-twitters/mp/senate/mp/house"))

twitter = doc.css('.content #list1')


json_file = File.read('mpsHashtest.json')

json_data = JSON.parse(json_file)

twitter.each do |item|
  hash = []
  mp_tag = ""
  twitter_handle = item.css('tbody tr')
  twitter_handle.each do |row|
   handle = row.css('td:first-child a').text
   mp_name = row.css('strong').text
       
    arr = mp_name.split(" ")
    first_name = arr[0]
    last_name = arr.last
    mp_id = ""
    json_data.each do |data|
      if data['name'].include?(first_name) && data['name'].include?(last_name)
        mp_id = data['id']
      end
    end
    if  mp_id == ""
        mp_name = ""
        handle = ""
    end

    if mp_id.length > 0
    hash.push({
     "mp_id": mp_id,
     "mp_name": mp_name,
     "handle": handle
   })
  end

  end
   

  # hash.map { |o| Hash[o.each_pair] }.to_json

  File.open("twitter.json","a") do |f|
    f.write(hash.to_json)
  end


end


    #   hash.push({
    #  :mp_id => mp_id,
    #  :mp_name => mp_name, )}
    # end
    # # puts mp_name
    # arr = mp_name.split(" ")
    # first_name = arr[0]
    # last_name = arr.last
    # puts last_name
    # mp_id = ""
    # json_data.each do |data|
    #   puts data
    #       if data['name'].include?(first_name) && data['name'].include?(last_name)
    #          mp_id = data['id']
    #     end
    #    end
    # puts mp_id
    # puts twitter_name





#     twitter2 = doc.css('.content #list1 tbody strong')


# twitter2 = doc.css('.content #list1 tbody strong')



# twitter.each do |line|  
#   array = [] 
#   twitter_handle = line.css('a').text
#   x = array.push(twitter_handle)
  
# end
