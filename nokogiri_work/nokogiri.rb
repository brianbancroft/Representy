
#Web Pages
require 'nokogiri'
require 'open-uri'

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
doc = Nokogiri::HTML(open(mpdoc))
pictureURL = doc.css('.profile img')[0]

end


# page = "http://www.parl.gc.ca/Parliamentarians/en/constituencies/"
#
#
# local_directory = "constit.html"
# local_mp = "single_constit.html"
#
# #For production, this will require a different approach
# doc = Nokogiri::HTML(open(local_mp))


 mpdoc = "sample_mp.html"


  htmlDOC = "constit.html"
  getConstitInfo(htmlDoc)
