require 'json'
require 'rubygems'
require 'open-uri'
require 'rest-client'
require 'json'
require 'pry'

json_file = File.read('sample_twitter_string.json')

json_data = JSON.parse(json_file)

binding.pry
