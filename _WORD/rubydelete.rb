require 'json'
require 'rubygems'
require 'crack'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('openParliamentMpHash.json')

json_data = JSON.parse(json_file)

