require 'pry'
require 'json'


file = File.read('members.json')
mp_hash = JSON.parse(file)



binding.pry
