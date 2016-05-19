require 'json'
require 'rubygems'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('mpsHash.json')

json_data = JSON.parse(json_file)

open('MP_seed.SQL', 'w') { |item|
  item << "INSERT INTO members (mp_id, name, party, cons_address, cons_phone, email, photo, ridingId, languages)"
  json_data.each do |i|
    if i['phone'] == ""
       i['phone'] = "N/A"
    end
    if i['email'] == ""
       i['email'] = "N/A"
    end
    if i['address'] == []
       i['address'].push("N/A")
    end
    item << "VALUES (\'#{i['id']}'\, \'#{i['name']}'\, \'#{i['party']}'\, \ ARRAY#{i['address']}\, \'#{i['phone']}'\, \'#{i['email']}'\, \'#{i['photo']}'\, \'#{i['riding_id']}'\, \'#{i['languages']}'\}),\n"
  
  end
  
}
