#NOKOGIRI work

The purpose of this directory is to test and record all structures of parl.gc.ca in order to dynamically find the following things:

1. Name of representative
2. Name of riding
3. Photo of represenative

I'm unsure whether we will plug into other things in the future in this site.


http://www.parl.gc.ca/Parliamentarians/en/constituencies/###

Working constituencies:
803
583


The list of ridings are found at the following page: http://www.parl.gc.ca/Parliamentarians/en/constituencies/

## Consituency name and ID - PROOF OF CONCEPT COMPLETE

The following snippers help us get the information from the main consituency page.
Namely, it gets us the name of the riding (in English) and the riding id which can be used when looking up candidates.

```ruby
htmlDOC = "constit.html"

doc = Nokogiri::HTML(open(htmlDOC))
regexp = /(\d\d\d)\)$/
ridingsList = []
constitList = doc.css('.constituency a')
constitList.each do |constit|
  ridingsList.push({:name => constit.text, :mp_id =>
   regexp.match(constit.attributes["href"])[1]})
  end
```

## MP Page

This is a page that contains all the critical information about that mp.

The following snippets aim to get us both the name and ID of the current MP for a given riding.

right = doc.css('.fright')[0]
left = doc.css('.fleft')[1]
