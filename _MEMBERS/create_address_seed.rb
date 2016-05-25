require 'pry'
require 'json'

file = File.read('membersHash.json')
members_hash = JSON.parse(file)

outFile = "memberUpdateAddressSeed.sql"
open(outFile,'w') {|line|
  members_hash.each do |member|
    line << "UPDATE members SET cons_address = \'#{member["address"]}\' \n WHERE id = \'#{member["id"]}\';\n"
  end
}
