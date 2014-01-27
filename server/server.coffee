if Meteor.isServer
	Meteor.startup ->
		Meteor.startup ->
			Officials.remove {}
			console.log 'asdfasdf'
	Meteor.methods
  	fetchOfficialData: (address) ->
    	Officials.remove {}
    	API_KEY = "AIzaSyDvNHDgiB8SVT4gftl-fuppPqAIc8X_CGI"
    	url = "https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=" + API_KEY
    	data = data:
      	address: address

    	Meteor.http.post url, data, (err, res) ->
      	console.log res.content
      	if res.statusCode is 200
        	officials_data = res.data.officials
        	i = 0
        	while i < Object.keys(officials_data).length
          	p_index = "P" + i
          	unless officials_data[p_index].photoUrl
            	photo = "http://www.ihssports.org/portals/2/profilephotos/person-icon.png"
          	else
            	photo = officials_data[p_index].photoUrl
          	params =
            	name: officials_data[p_index].name
            	address: officials_data[p_index].address
            	channels: officials_data[p_index].channels
            	party: officials_data[p_index].party
            	photo: photo

          	Officials.insert params
          	i++
  	getRepInfo: (name) ->
  		@unblock()
  		API_KEY = 'cfa496ce390e49b0b57d5ddab36e70a2'
  		url = "http://transparencydata.com/api/1.0/entities.json?search=" + name + "&apikey=" + API_KEY
  		Meteor.http.call "GET", url

  	getRepId: (name) ->
  		@unblock()
  		API_KEY = 'cfa496ce390e49b0b57d5ddab36e70a2'
  		url = "http://transparencydata.com/api/1.0/entities.json?search=" + name + "&apikey=" + API_KEY
  		Meteor.http.call "GET", url

  	getRepOverview: (repId) ->
    		@unblock()
    		root_url = "http://transparencydata.com/api/1.0/entities/"
    		id = repId
    		format = ".json?apikey="
    		API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
    		url = root_url + id + format + API_KEY
    		Meteor.http.call "GET", url

  	getCampaignContributions: (name) ->
    	@unblock()
    	root_url = "http://transparencydata.com/api/1.0/contributions.json?amount=%3E%7C3000&recipient_ft="
    	API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
    	url = root_url + name + "&per_page=20" + "&apikey=" + API_KEY
    	Meteor.http.call "GET", url

  	getVendorMatch: (employer) ->
    	@unblock()
    	url = "https://controllerdata.lacity.org/resource/pggv-e4fn.json?$q=" + employer
    	Meteor.http.call "GET", url


