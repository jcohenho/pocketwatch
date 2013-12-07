if (Meteor.isServer) {
  Meteor.startup(function () {
   API_KEY = 'AIzaSyD7yaU7dv0eWYXyxsgobzxdB62n01fNAZg'
   request_url = 'https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?includeOffices=true&key=' + API_KEY
 // Meteor.http.get(request_url, [],  [callback]);
  });
}
