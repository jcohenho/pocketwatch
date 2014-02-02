if Meteor.isServer
	Meteor.startup ->
		Meteor.startup ->
			Officials.remove {}
	Meteor.methods
  	fetchOfficialData: (address) ->
    	Officials.remove {}
    	API_KEY = "AIzaSyDvNHDgiB8SVT4gftl-fuppPqAIc8X_CGI"
    	url = "https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=" + API_KEY
    	data = data:
      	address: address

    	Meteor.http.post url, data, (err, res) ->
      	if res.statusCode is 200
          officesData = res.data.offices
          officials_data = res.data.officials
          for OfficeIndex, office of officesData
            for officeId in office.officialIds
              official = officials_data[officeId]
              if official.photoUrl is undefined
                photo = "http://www.ihssports.org/portals/2/profilephotos/person-icon.png"
              else
                photo = official.photoUrl
              params =
                name: official.name
                office: office.name
                level: office.level
                address: official.address
                channels: official.channels
                party: official.party
                photo: photo
              Officials.insert(params)
  	getRepInfo: (name) ->
  		@unblock()
  		API_KEY = 'cfa496ce390e49b0b57d5ddab36e70a2'
  		url = "http://transparencydata.com/api/1.0/entities.json?search=#{name}&apikey=#{API_KEY}"
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


