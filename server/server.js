if (Meteor.isServer) {
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
                            var photo = 'http://lorempixel.com/90/110/';
                        }
                        else {
                            var photo = officials_data[p_index].photoUrl;
                        }
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
            });
        },
        getRepInfo: function() {
            //var rep_hash = new Future();
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
            url = "http://transparencydata.com/api/1.0/entities.json?search=Mike%20Feuer&apikey=" + API_KEY;
            Meteor.http.get(url, function( err, res ) {
                //rep_hash = rep_hash.return(res);
                return res;
            });
            //return rep_hash.wait();
        },
        getRepId: function(){
            //var repId = new Future();
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2"
            url = "http://transparencydata.com/api/1.0/entities.json?search=Mike%20Feuer&apikey=" + API_KEY;
            Meteor.http.get(url, function( err, res ) {
                //epId = repId.return(res['data'][0]['id']);
                return res['data'][0]['id'];
            });
            //return repId.wait();
        },
        getRepOverview: function(){
            //var repDetails = new Future();
            root_url = 'http://transparencydata.com/api/1.0/entities/';
            id = 'c9c21fa172c64602a1eee643e4bedb4a';
            format = '.json?apikey=';
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2";
            url = root_url + id + format + API_KEY;
            Meteor.http.get(url, function( err, res ) {
                //repDetails = repDetails.return(res);
                return res;
            });
            //return repDetails.wait();
        },
        getCampaignContributions: function(){
            //var contributions = new Future();
            root_url = 'http://transparencydata.com/api/1.0/contributions.json?amount=%3E%7C5000&recipient_ft=';
            name = 'Mike%20Feuer';
            API_KEY = "cfa496ce390e49b0b57d5ddab36e70a2";
            url = root_url + name + '&per_page=20' + '&apikey=' + API_KEY;
            Meteor.http.get(url, function( err, res ) {
                console.log(res);
                return res;
            });
        },
        getVendorMatch: function(){
            //var vendors = new Future();
            url = 'https://controllerdata.lacity.org/resource/7bbq-8b9r.json';
            Meteor.http.get(url, function( err, res ) {
                //vendors = vendors.return(res.data[0]);
                return res.data[0];
            });
            //return vendors.wait();
        }
    });
}
