require 'pry'
require 'json'

#Creates a textfile for seeding the database that can be copied and pasted for
# seeds.rb. each line should have the following format:
#   Country.create(name: 'Germany', population: 81831000)


def write_mp_seed(mpId, name, party, address, phone, email, photourl, ridingId, languages)
  string_ouput = "Mp.seed(name: \"#{id}"\, \"#{name}\", party: \"#{party}\", cons_address: #{address}, cons_phone: \"#{phone}\", email: \"#{email}\", photo: \"#{photourl}\", riding: Riding.find_by(special_riding_id: #{ridingID}), languages: \"#{languages}\")"
end


def write_riding_seed()

end


file = File.read('mpsHash.json')
mp_hash = JSON.parse(file)

open('mp_seed.rb', 'w') { |f|
  f << "module Mp_seed \n"
  f << "  def seed \n"
  mp_hash.each do |mp|
    f << "    " + write_mp_seed(mp["mpid"], mp["name"], mp["party"], mp["address"],mp["phone"],mp["email"], mp["photo"], mp["riding_id"], mp["languages"]) + "\n"
  end
  f<< "  end\n"
  f << "end"
}
