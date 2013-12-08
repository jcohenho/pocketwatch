if (Meteor.isClient) {
    Meteor.startup( function() {
        Meteor.call( 'openSession', function( err, res ) {
            if( !err) Session.set( 'google-data', res );
        });
        Meteor.call('getRepInfo', function(err, res) {
          if (!err) Session.set('sunlight-data', res);
        });
        Meteor.call('getRepId', function(err, res){
            if (!err) Session.set('repId', res)
        });
        Meteor.call('getRepOverview', function(err, res){
            if (!err) Session.set('repOverview', res)
        });
        Meteor.call('getCampaignContributions', function(err, res){
            if (!err) Session.set('contributions', res)
                console.log(res);
        });
        Meteor.call('getVendorMatch', function(err, res){
            if (!err) Session.set('vendors', res);
        });
    });

    Template.repoverview.bio = function(){
        return Session.get('repOverview') ? Session.get('repOverview').data.metadata.bio : '';
    }

    Template.repoverview.photo = function(){
        return Session.get('repOverview') ? Session.get('repOverview').data.metadata.photo_url : '';
    }

    Template.donations.total_received = function(){
        return Session.get('sunlight-data').data[0]['total_received'];
    }

    Template.donations.biggest_donations = function(){
        return Session.get('contributions') ? Session.get('contributions').data[0] : '';
    };

    Template.content.officials = function () {
        return Officials.find();
    };

    Template.input.events({
        'click #search': function() {
            var address = $('#address').val();
            if (!address) {
                alert('Enter in your address!');
            }
            Meteor.call('fetchOfficialData', address);
        }
    });

    Template.vendors.expenditure = function(){
        return Session.get('vendors') ? Session.get('vendors')['sum_dollar_amount'] : '';
    }
    Template.vendors.vendor_name = function(){
        return Session.get('vendors') ? Session.get('vendors')['vendor_name'] : '';
    }
}


