require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

doc = Nokogiri::HTML(open("http://www.parl.gc.ca/HousePublications/Publication.aspx?Language=e&Mode=1&Parl=42&Ses=1&DocId=8072101"))

json_file = File.read('mpsHash.json')

json_data = JSON.parse(json_file)

committee_list = doc.css('#TABLE > tr:nth-child(n+2):nth-child(-n+24) > td:nth-child(1)')


committee_list.each do |data| 
  committee_hash = []
  output = []
  output2 =[]

  # comm = data.children[1].children[1].css('b').text()
  # puts comm
  title = data.children[1].children[1].css('b').text()
  members = data.children[3].children[3].children.children
  associate_members = data.children[5].children[3].children.children
  puts title
  mp_id = ""
  committee_title = ""


  puts "----members-----"
  members.each do |item|
    if item.text != ""     
      output.push(item.text)
      json_data.each do |data|
        if (data['name']) =~ /#{item.text}/
           mp_id = data['id']
           committee_title = title
        end
      end 
       committee_hash.push({
      :mp_id => mp_id,
      :committee_title => committee_title,
      })  

    end
    # puts mp_id
     # committee_hash.push({
     #  :mp_id => mp_id,
     #  :committee_title => committee_title,
     #  })  

    # committee_hash.map { |o| Hash[o.each_pair.to_a] }.to_json

  end

  puts "-----associate members------"
  associate_members.each do |item|
    output = []
    if item.text != ""     
       output.push(item.text)
       json_data.each do |data|
          if (data['name']) =~ /#{item.text}/
             mp_id = data['id']
             committee_title = title
          end
        end
       committee_hash.push({
          :mp_id => mp_id,
          :committee_title => committee_title,
          })

    end

  end


  committee_hash.map { |o| Hash[o.each_pair.to_a] }.to_json

  File.open("committee_hash.json","a") do |f|
  f.write(committee_hash)
  end

end




# "ACVA"  "Veterans Affairs"
# # "AGRI"  "Agriculture and Agri-Food"
# # "CHPC"  "Canadian Heritage"
# # "CIIT"  "International Trade"
# # "CIMM"  "Citizenship and Immigration"
# # "ENVI"  "Environment and Sustainable Development"
# # "ETHI"  "Access to Information, Privacy and Ethics"
# # "FAAE"  "Foreign Affairs and International Development"
# "FEWO"  "Status of Women"
# # "FINA"  "Finance"
# # "FOPO"  "Fisheries and Oceans"
# # "HESA"  "Health"
# # "HUMA"  "Human Resources, Skills and Social Development and the Status of Persons with Disabilities"
# # "INAN"  "Indigenous and Northern Affairs"
# # "INDU"  "Industry, Science and Technology"
# # "JUST"  "Justice and Human Rights"
# # "LANG"  "Official Languages"
# # "NDDN"  "National Defence"
# # "OGGO"  "Government Operations and Estimates"
# # "PACP"  "Public Accounts"
# # "PROC"  "Procedure and House Affairs"
# # "RNNR"  "Natural Resources"
# # "SECU"  "Public Safety and National Security"
# "TRAN"  "Transport, Infrastructure and Communities"

