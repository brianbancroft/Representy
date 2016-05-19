require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'ostruct'
require 'pry'

# DATA_MAP = { 

#   "name.en": {db: "description", format: "string"},
#   "introduced": {db: "date_introduced", format: "date" }

# }

url='http://api.openparliament.ca/politicians/?format=json'

name_json = Crack::JSON.parse(RestClient.get(url))


json_file = File.read('mpsHash.json')

json_data = JSON.parse(json_file)

# puts name_json
@name_arr = []


name_json['objects'].each do |mp_info|
  sponsored_bill_hash = []
    mps_name = mp_info['name'].downcase.gsub(" ", "-")
    mps_name = CGI.escape(mps_name)
    bill_sponsor = 'http://api.openparliament.ca/bills/?sponsor_politician=' + mps_name + '&session=42-1&format=json'
    rest_url = { "rest_url": bill_sponsor }
    mp_details = mp_info.merge!(rest_url)
    rest = RestClient.get(mp_details[:rest_url])
    bill = JSON.parse(rest)
    mp_name = mp_details['name']
    mp_id = ""
#    puts mp_name
    json_data.each do |data|
      # puts "matching #{mp_name}Against #{data['name']}"
      if (data['name']) =~ /#{mp_name}/
         mp_id = data['id']
      end
    end
    if  bill["objects"] === []
        bill_exist = "No sponsored bills."
    else 
      bill_exist = "Bill Information:"
      bill_number = bill["objects"][0]["number"]
      bill_english = bill["objects"][0]["name"]["en"]
      bill_french = bill["objects"][0]["name"]["fr"]
      bill_introduce_date = bill["objects"][0]["introduced"]
      bill_legisinfo_id = bill["objects"][0]["legisinfo_id"]
      @name_arr.push mp_details
   end

   if bill_exist === "No sponsored bills."
      sponsored_bill_hash.push({
       :mpName => mp_name,
       :billInfo => bill_exist,
       :mp_id => mp_id,
       })
    else
      sponsored_bill_hash.push({
        :billInfo => bill_exist,
        :mpName => mp_name,
        :mp_id => mp_id,
        :billNumber => bill_number,
        :descriptionEN => bill_english,
        :descriptionFR => bill_french,
        :dateIntroduced => bill_introduce_date,
        :legisinfoID => bill_legisinfo_id,
    })
    end

   sponsored_bill_hash.map { |o| Hash[o.each_pair.to_a] }.to_json


  File.open("sponsored_bills.json","a") do |f|
    f.write(sponsored_bill_hash)
  end

end




