if (Meteor.isServer) {
    Meteor.methods({
        openSession: function() {
            API_KEY = 'AIzaSyD7yaU7dv0eWYXyxsgobzxdB62n01fNAZg';
            var data = {data: {address: '2607 34th St., Santa Monica, CA, 90405' } }
            result = Meteor.http.post("https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=AIzaSyDjawrLW6qLmkIgoY4Gubo6Q-gSM2_EuYg",data, function(error, data) {
                console.log(data.content);
                });
            }
        });
    }
