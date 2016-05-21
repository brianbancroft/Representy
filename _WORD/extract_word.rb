require 'pry'
require 'json'
require 'open-uri'

url_base = "http://api.openparliament.ca/politicians/"
url_end = "/?format=json"


file = File.read('members.json')
members = JSON.parse(file)
nameArray = []

members.each do |member|
  name = member["name"].split(" ")
  name.delete_if {|element| element == "The"}
  name.delete_if {|element| element == "Right"}
  name.delete_if {|element| element == "Honourable"}

  name = name[0] + "-" +  name[name.length - 1]
  nameArray.push(name.downcase)
end
element = File.open("last_scanned_element.txt").read.to_i


# File.open(yourfile, 'w') { |file| file.write("your text") }

for i in element..nameArray.length

  url = url_base + nameArray[i] + url_end
  binding.pry

  buffer = open(url).read
  binding.pry
  result = JSON.parse(buffer)

end
