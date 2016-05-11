
#Web Pages
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry'

def getConstitInfo(page)

  doc = Nokogiri::HTML(open(htmlDOC))
  regexp = /(\d+)\)$/
  ridingsList = []
  constitList = doc.css('.constituency a')
  constitList.each do |constit|
    ridingsList.push({:name => constit.text, :riding_id =>
     regexp.match(constit.attributes["href"])[1]})
    end

  index = 0
  mpList = []
  memberList = doc.css('.personName a')
  memberList.each do |person|
    index += 1
    mpList.push({:name => person.text, :mp_id =>
     regexp.match(person.attributes["href"])[1]})
  end
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
  binding.pry

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

 mpdoc = "sample_mp.html"
 mphash = getMPInfo(mpdoc)
 binding.pry
