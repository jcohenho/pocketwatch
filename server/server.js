if (Meteor.isServer) {
    Meteor.startup( function() {
        Officials.remove({});
    });
    Meteor.methods({
        fetchOfficialData: function(address) {
            Officials.remove({});
            API_KEY = "AIzaSyDvNHDgiB8SVT4gftl-fuppPqAIc8X_CGI"
            url = "https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=" + API_KEY
            var data = {data: {address: address } }
            Meteor.http.post(url,data, function( err, res ) {
                if (res.statusCode === 200) {
                    officials_data = res.data.officials;
                    for (var i = 0; i < Object.keys(officials_data).length; i++) {
                        var p_index = 'P' + i;
                        if (!officials_data[p_index].photoUrl) {
                            var photo = 'http://www.ihssports.org/portals/2/profilephotos/person-icon.png';
                        }
                        else {
                            var photo = officials_data[p_index].photoUrl;
                        }
                        console.log(officials_data);
                        if (officials_data[p_index].name =='Eric Garcetti' || officials_data[p_index].name == 'Mike Feuer' ||
                            officials_data[p_index].name == 'Leroy Baca' || officials_data[p_index].name == 'Barbara Boxer'){
                            params = {
                                name: officials_data[p_index].name,
                                address: officials_data[p_index].address,
                                channels: officials_data[p_index].channels,
                                party: officials_data[p_index].party,
                                photo: photo
                            }
                            Officials.insert(params);
                        }

                    }
                }
            });
        },
        getRepInfo: function(name) {
            this.unblock()
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
            url = "http://transparencydata.com/api/1.0/entities.json?search=" + name + "&apikey=" + API_KEY;
            return Meteor.http.call("GET", url);
        },
        getRepId: function(name){
            this.unblock()
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
            url = "http://transparencydata.com/api/1.0/entities.json?search=" + name + "&apikey=" + API_KEY;
            return Meteor.http.call("GET", url);
        },
        getRepOverview: function(repId){
            this.unblock();
            root_url = 'http://transparencydata.com/api/1.0/entities/';
            id = repId;
            format = '.json?apikey=';
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2";
            url = root_url + id + format + API_KEY;
            return Meteor.http.call("GET", url);
        },
        getCampaignContributions: function(name){
            this.unblock()
            root_url = 'http://transparencydata.com/api/1.0/contributions.json?amount=%3E%7C3000&recipient_ft=';
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2";
            url = root_url + name + '&per_page=20' + '&apikey=' + API_KEY;
            return Meteor.http.call("GET", url);
        },
        getVendorMatch: function(employer){
            this.unblock();
            url = 'https://controllerdata.lacity.org/resource/pggv-e4fn.json?$q=' + employer;
            return Meteor.http.call("GET", url)
        }
    });
}
