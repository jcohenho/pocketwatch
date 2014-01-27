if Meteor.isClient
	Template.repoverview.bio = ->
		bio = 'asdfasdf'
		if bio is undefined
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
		name = encodeURI $(event.currentTarget).children().attr 'id'
		Meteor.call "getRepInfo", name, (err, res) ->
			console.log res
			if res.content isnt "[]"
				Session.set "repInfo", res
			else
				Session.set "repInfo", "No Data On File"
		Meteor.call "getRepId", name, (err, res) ->
			Session.set("repId", res)
			setTimeout(callGetRepOverview(res), 500)


		Meteor.call "getCampaignContributions", name, (err, res) ->
			Session.set "campaignContribs", res

	Template.donations.events "click .single-donation": (event) ->
		employer.encodeURI $(event.currentTarget).children()[5].id
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
