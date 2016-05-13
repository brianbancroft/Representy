require 'pry'
require 'json'

#Creates a textfile for seeding the database that can be copied and pasted for
# seeds.rb. each line should have the following format:
#   Country.create(name: 'Germany', population: 81831000)


def write_mp_seed(name, party, address, phone, email, photourl, ridingID)
  string_ouput = "Mp.seed(name:#{name}, party: #{party}, cons_address: #{address}, cons_phone: #{phone}, email: #{email}, photo: #{photourl}, riding_id: #{ridingID})"
end


def write_riding_seed()


end


file = File.read('mpsHash.json')
mp_hash = JSON.parse(file)

open('mp_seeds.rb', 'w') { |f|
  f << "module Mp_seed "
  f << "  def seed"
  mp_hash.each do |mp|
    f << "  " + write_mp_seed(mp[:name], mp[:party], mp[:address],mp[:phone],mp[:email], mp[:photo], mp[:riding_id])
  end
  f<< "  end"
  f << "end"
}
