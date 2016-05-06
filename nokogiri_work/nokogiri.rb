
#Web Pages
require 'nokogiri'

page = "http://www.parl.gc.ca/Parliamentarians/en/constituencies/"
local_directory = "constit.html"

require 'open-uri'
doc = Nokogiri::HTML(open(local_directory))
