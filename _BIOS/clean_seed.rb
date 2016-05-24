require 'pry'

# Removes all Wikipedia Source Link box braces.
inFile = ARGV[0]
outFile = "#{inFile.split('.')[0]}_cleaned.#{inFile.split('.')[1]}"

regex = /(\[\d\])/

f = File.open(outFile, 'w')
File.open(inFile, "r") do |inLine|
  binding.pry
  f << inLine.read.sub(regex,'')
end
