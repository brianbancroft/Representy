
#Web Pages
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

PARL_ID_REGEXP = /(\d+)\)$/

base_constituency_page = "http://www.parl.gc.ca/Parliamentarians/en/constituencies/"
base_single_mp = "http://www.parl.gc.ca/Parliamentarians/en/members/"

def getConstitInfo(page)

  constituencies = []

  doc = Nokogiri::HTML(open(page))
  ridingsList = []
  constitList = doc.css('.constituency a')
  constitList.each do |constit|
    ridingsList.push({:name => constit.text, :riding_id =>
     PARL_ID_REGEXP.match(constit.attributes["href"])[1]})
    end
  ridingsList
end


def getRidingInfo(page)
  doc = Nokogiri::HTML(open(page))

  mpinfo = {
    :name => doc.css('.mp.wrap')[0].text,
    :link => doc.css('.mp.wrap a')[0].attributes["href"].value,
    :mpid => PARL_ID_REGEXP.match(doc.css('.mp.wrap a')[0].attributes["href"].value)[1]
  }
end

def getMPInfo(page)
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
    :party => partyName,
    :riding => ridingName,
    :languages => mpLang,
    :photo => pictureURL,
    :phone => phoneNumber,
    :address => constitAddress
  }

end



all_constituencies_info = getConstitInfo(base_constituency_page)


riding_info = []
mp_info = []
all_constituencies_info.each do |constituency|
  url = base_constituency_page + constituency[:riding_id]
  riding_info.push(getRidingInfo(url))
  url = base_single_mp + riding_info[riding_info.length - 1][:mpid]
  binding.pry
  mp_info.push(getMPInfo(url))


end
