
#Web Pages
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

PARL_ID_REGEXP = /(\d+)\)$/

base_constituency_page = "http://www.parl.gc.ca/Parliamentarians/en/constituencies/"
base_single_mp = "http://www.parl.gc.ca/Parliamentarians/en/members/"

def getConstitInfo(page)

  constituenciesHash = []

  doc = Nokogiri::HTML(open(page))
  constitList = doc.css('.list tbody tr')
  constitList.each do |constit|
    ridingName = constit.children[1].children[1].text
    ridingID = PARL_ID_REGEXP.match(constit .children[1].css("a")[0].attributes["href"].value)[1]

    #dependent on non-vacancy
    begin
      if constit.children[5].css('a').empty?
        mpName = "Vacant"
        partyName = "N/A"
        mpID = "N/A"
      else
        mpName = constit.children[5].css('a')[0].text
        partyName = constit.children[7].children[1].children[0].text
        mpID = PARL_ID_REGEXP.match(constit.children[5].css('a')[0].attributes["href"].value)[1]
      end
    rescue
      binding.pry
    end

    constituenciesHash.push({
      :ridingName => ridingName,
      :ridingID => ridingID,
      :mpName => mpName,
      :mpID => mpID,
      :party => partyName
      })
    end

    constituenciesHash.map { |o| Hash[o.each_pair.to_a] }.to_json

end

def getMPInfo(page)
  mpID = page.split('/')[page.split('/').length - 1]
  phoneCaptureRegex = /Telephone: (\d\d\d-\d\d\d-\d\d\d\d)/
  faxExcludeRegex = /Fax:/
  phoneNumber = ""
  constitAddress = []

  doc = Nokogiri::HTML(open(page))

  pictureURL = doc.css('.profile img')[0]["src"]
  partyName = doc.css('.caucus a')[0].text
  email = doc.css('.caucus a')[1].text
  mpName = doc.css('.profile h2')[0].text
  ridingName = doc.search('.profile.overview.header div div .constituency')[0].text
  ridingID = PARL_ID_REGEXP.match(doc.search('.profile.overview.header div div .constituency a')[0].attributes["href"].value)[1]
  mpLang = doc.search('.profile.overview.header div div .constituency')[1].text

  if doc.search('.profile.overview.header div div .constituency').length == 3
    mpLang += doc.search('.profile.overview.header div div .constituency')[2].text
  end

  phoneNumber = ""
  constitAddress = []

  doc.search('.constituencyoffices ul li span').each do |line|
    if line.text =~ phoneCaptureRegex
      phoneNumber = phoneCaptureRegex.match(line.text)[1]
    elsif not (line.text =~ faxExcludeRegex )|| (line.text == "")
      constitAddress.push(line.text)
    end

  end

  returnHash = {
    :name => mpName,
    :id => mpID,
    :party => partyName,
    :riding => ridingName,
    :riding_id => ridingID,
    :languages => mpLang,
    :photo => pictureURL,
    :phone => phoneNumber,
    :address => constitAddress,
    :email => email
  }

end

# constituenciesHash = getConstitInfo(base_constituency_page)
# File.open("constituencies_info.json","w") do |f|
#   f.write(constituenciesHash)
# end
file1 = File.read("constituencies_info.json")
constHash = JSON.parse(file1)
#
file2 = File.read("mpsHash.json")
mpsHash = JSON.parse(file2)

lastMP = mpsHash[mpsHash.length-1]["id"]

first_unread = constHash.index{|element| element["mpID"] == lastMP } + 1

# begin
   (first_unread..(constHash.length - 1)).each do |i|
    if constHash[i]["mpID"] != "N/A"
      url = base_single_mp + constHash[i]["mpID"]
      mpsHash.push(getMPInfo(url))
    end
  end
# rescue
#   binding.pry
#   File.open("mpsHash.json","w") do |f|
#     f.write(mpsHash.map { |o| Hash[o.each_pair.to_a] }.to_json)
#   end
#   print "It timed out.."
# end



 File.open("mpsHash.json","w") do |f|
   f.write(mpsHash.map { |o| Hash[o.each_pair.to_a] }.to_json)
 end
