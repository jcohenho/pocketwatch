if Meteor.isClient
	Template.repoverview.bio = ->
		bio = (if Session.get("repOverview") then Session.get("repOverview").data.metadata.bio else "")
		if bio is '' or bio is undefined
			'not available'
		else
			escaped_bio = bio.replace(/(<([^>]+)>)/g, "")
			escaped_bio

	Template.repoverview.photo = ->
		alt_photo = (if Session.get("repOverview") then Session.get("repOverview").data.metadata.photo_url else "")
		if alt_photo is undefined
			'not available'
		else
			alt_photo

	Template.repoverview.contribution_sums = ->
		contrib_sum = if Session.get("repOverview") then Session.get("repOverview").data.totals["-1"]["recipient_amount"] else ""
		"Political Contributions Received to Date: #{contrib_sum}"

	Template.donations.total_received = ->
		Session.get('sunlight-data').data[0]['total_received']

	Template.donations.biggest_donations = ->
		if Session.get('contributions') then Session.get('contributions').data[0] else ''

	Template.donations.donation_collection = ->
		if Session.get('campaignContribs') then Session.get('campaignContribs').data else ''

	Template.content.officials = ->
		Officials.find()

	Template.input.events "click #search": ->
		address = $('#address').val()
		alert 'Enter your address!' unless address
		Meteor.call 'fetchOfficialData', address, (error, result) ->

	callGetRepOverview = (response)->
		Meteor.call("getRepOverview", response.data['0'].id, (err, res) ->
			Session.set('repOverview', res))

	Template.content.events "click .info": (event) ->
		id = $(event.currentTarget).children().attr 'id'
		littleSisMapping =
			'Eric Garcetti': 111427
			'Tom Torlakson': 137636
			'Leroy Baca': 87978
			'John Noguez': 94427
			'Edmund Gerald Brown, Jr.': 33962
			'Debra Bowen': 134193
		influenceExplorerMapping =
			"Barack Hussein Obama II": "Barack Obama"
			"Joseph (Joe) Robinette Biden Jr.": "Joseph Biden"
			"Edmund Gerald Brown, Jr.": "Jerry Brown"
		if influenceExplorerMapping[id] != undefined
			id = influenceExplorerMapping[id]
		name = encodeURI id
		Meteor.call "getRepInfo", name, (err, res) ->
			console.log "Sunlight Data"
			console.log res
			if res.content isnt "[]"
				Session.set "repInfo", res
				setTimeout(callGetRepOverview(res), 500)
			else
				apiId = littleSisMapping[id]
				console.log 'littlesis'
				Meteor.http.call "GET", "http://api.littlesis.org/entity/#{apiId}/details.xml?_key=7fcd3c0924f2597b9deba56c9f39ed4473405ae3", (error, result) ->
					littleSisData = $.xml2json(result.content).Response.Data.Entity
					console.log littleSisData
					#setTimeout(Session.set('repOverview', littleSisData), 500)


		Meteor.call "getCampaignContributions", name, (err, res) ->
			Session.set "campaignContribs", res

	Template.donations.events "click .single-donation": (event) ->
		employer = encodeURI $(event.currentTarget).children()[5].id
		employer = employer.replace("&", "and")
		Meteor.call "getVendorMatch", employer, (err, res) ->
			Session.set "vendorMatch", res.data[0]
		vendor_contrib = $(event.currentTarget).children()[1]['innerText']
		Session.set "individual_contribution", vendor_contrib

	Template.vendors.vendor_name = ->
		if Session.get("vendorMatch") then Session.get("vendorMatch")["vendor_name"] else ""

	Template.vendors.amount = ->
		if Session.get("vendorMatch") then Session.get("vendorMatch")["dollar_amount"] else ""

	Template.vendors.contribution = ->
		if Session.get("individual_contribution") then Session.get("individual_contribution") else ""

	Handlebars.registerHelper "arrayify", (obj) ->
		result = []
		i = 0
		while i < obj.length
			result.push
				org_name: obj[i]["organization_name"]
				amount: obj[i]["amount"]
				city: obj[i]["contributor_city"]
				person_name: obj[i]["contributor_name"]
				occupation: obj[i]["contributor_occupation"]
				contrib_type: obj[i]["contributor_type"]
				employer: obj[i]["contributor_employer"]
			i++
		result
