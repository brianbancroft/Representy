require 'pry'
require 'json'
require 'open-uri'

url_base = "http://api.openparliament.ca/politicians/"
url_end = "/?format=json"


file = File.read('members.json')
members = JSON.parse(file)
nameArray = []
#
inputHash = File.read('openParliamentMpHash.json')
mp_hash = JSON.parse(inputHash)
binding.pry
# mp_hash = []

# members.each do |member|
#   name = member["name"].split(" ")
#   name.delete_if {|element| element == "The"}
#   name.delete_if {|element| element == "Right"}
#   name.delete_if {|element| element == "Honourable"}

#   name = name[0] + "-" +  name[name.length - 1]
#   nameArray.push(name.downcase)
# end

# myLastElementFile = "last_scanned_element.txt"
# element = File.open(myLastElementFile).read.to_i


# # File.open(yourfile, 'w') { |file| file.write("your text") }

# for i in element..nameArray.length
#   begin
#     url = url_base + nameArray[i] + url_end
#     # binding.pry
#     buffer = open(url).read
#     result = JSON.parse(buffer)
#     mp_hash.push(result)
#     element += 1
#     puts "Success : " + url

#   rescue Exception => e
#     puts e.message
#     puts url
#     File.open(myLastElementFile, 'w') { |file| file.write(element.to_s) }
#     File.open("openParliamentMpHash.json", 'w') { |file| file.write(mp_hash) }
#     binding.pry
#   end

# end

# File.open("openParliamentMpHash.json", 'w') { |file| file.write(mp_hash) }
# puts "jobs done"
