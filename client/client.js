if (Meteor.isClient) {

    Template.repoverview.bio = function(){
        bio = Session.get('repOverview') ? Session.get('repOverview').data.metadata.bio : 'Not Available';
        if (bio == undefined){
            return 'Not Available'
        } else{
            return bio;
        }
    }

    Template.repoverview.photo = function(){
        alt_photo = Session.get('repOverview') ? Session.get('repOverview').data.metadata.photo_url : '';
        if (alt_photo == undefined){
            return 'Not Available'
        } else{
            return alt_photo;
        }
    }

    Template.repoverview.contribution_sums = function(){
        contrib_sum = Session.get('repOverview') ? Session.get('repOverview').data.totals['-1']['recipient_amount'] : '';
        return contrib_sum;
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
            Meteor.call('fetchOfficialData', address, function (error, result) {} );
        }
    });

    Template.content.events({
        'click .info': function(event){
            console.log($(event.currentTarget).children().attr('id'));
            var name = encodeURI($(event.currentTarget).children().attr('id'));
            Meteor.call('getRepOverview', function(err, res){
                Session.set('sunlight-data', res);
            });
            Meteor.call('getRepInfo', name, function(err, res){
                Session.set('repInfo', res);
            });
            Meteor.call('getRepId', name, function(err, res){
                Session.set('repId', res);
                Meteor.call('getRepOverview', Session.get('repId').data['0'].id, function(err, res){
                    Session.set('repOverview', res);
                });
            });
            Meteor.call('getCampaignContributions', name, function(err, res){
                console.log(res);
                Session.set('campaignContribs', res);
            });
            Meteor.call('getVendorMatch', function(err, res){
                Session.set('vendorMatch', res);
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


