if (Meteor.isClient) {

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

    Template.content.events({
        'click .info': function(){
            console.log('clicked');
            Meteor.call('getRepOverview', function(err, res){
                Session.set('sunlight-data', res);
                console.log(Session.get('sunlight-data'));
            });
            Meteor.call('getRepInfo', function(err, res){
                Session.set('repInfo', res);
                console.log(Session.get('repInfo'));
            });
            Meteor.call('getRepId', function(err, res){
                Session.set('repId', res);
                console.log(Session.get('repId'));
            });
            Meteor.call('getRepOverview', function(err, res){
                Session.set('repOverview', res);
                console.log(Session.get('repOverview'));
            });
            Meteor.call('getCampaignContributions', function(err, res){
                Session.set('campaignContribs', res);
                console.log(Session.get('campaignContribs'));
            });
            Meteor.call('getVendorMatch', function(err, res){
                Session.set('vendorMatch', res);
                console.log(Session.get('vendorMatch'));

            });
        }
    });

    Template.vendors.expenditure = function(){
        return Session.get('vendors') ? Session.get('vendors')['sum_dollar_amount'] : '';
    }
    Template.vendors.vendor_name = function(){
        return Session.get('vendors') ? Session.get('vendors')['vendor_name'] : '';
    }
}


