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
                        Officials.insert({
                            name: officials_data[p_index].name,
                            address: officials_data[p_index].address,
                            channels: officials_data[p_index].channels,
                            party: officials_data[p_index].party,
                            photo: officials_data[p_index].photoUrl
                        });
                    }
                }
            });
        }
    });
}
