require 'pry'
require 'json'

#Creates a textfile for seeding the database that can be copied and pasted for
# seeds.rb. each line should have the following format:
#   Country.create(name: 'Germany', population: 8183
  # 1000)


def write_riding_seed(ridingName, ridingID, mpID)
  string_ouput = "Riding.seed(name: \'#{ridingName}\', special_riding_id: \'#{ridingID}\', special_mp_id: \'#{mpID}\')"
end


# def write_riding_seed()


# end


file = File.read('constituencies_info.json')
const_hash = JSON.parse(file)

open('riding_seed.rb', 'w') { |f|
  f << "module Riding_seed \n"
  f << "  def seed \n"
  const_hash.each do |riding|
    f << "    " + write_riding_seed(riding["ridingName"], riding["ridingID"], riding["mpID"]) + "\n"
  end
  f<< "  end\n"
  f << "end"
}
