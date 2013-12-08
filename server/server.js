if (Meteor.isServer) {
    var Future = Npm.require("fibers/future");
    Meteor.methods({
        openSession: function() {
            var fut = new Future();
            API_KEY = "AIzaSyDvNHDgiB8SVT4gftl-fuppPqAIc8X_CGI"
            url = "https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=" + API_KEY
            var data = {data: {address: '2607 34th St., Santa Monica, CA, 90405' } }
            this.unblock();
            Meteor.http.post(url,data, function( err, res ) {
                console.log(res.content);
                fut.return(res);
            });
            return fut.wait();
        }
    });
}
