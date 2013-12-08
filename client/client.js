if (Meteor.isClient) {

    Template.repoverview.bio = function(){
        bio = Session.get('repOverview') ? Session.get('repOverview').data.metadata.bio : 'Not Available';
        if (bio == undefined){
            return 'Not Available'
        } else{
            var escaped_bio = bio.replace(/(<([^>]+)>)/ig,"");
            return escaped_bio;
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

    Template.donations.donation_collection = function(){
        return Session.get('campaignContribs') ? Session.get('campaignContribs').data : '';
    }

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

            var name = encodeURI($(event.currentTarget).children().attr('id'));
            Meteor.call('getRepInfo', name, function(err, res){
                Session.set('repInfo', res);
            });
            Meteor.call('getRepId', name, function(err, res){
                Session.set('repId', res);
                setTimeout(function(){

                    Meteor.call('getRepOverview', res.data['0'].id, function(err, res){
                        Session.set('repOverview', res);
                    });
                }, 300)
            });
            Meteor.call('getCampaignContributions', name, function(err, res){
                Session.set('campaignContribs', res);
            });
        }
    });

    Template.donations.events({
        'click .single-donation': function(event){
            console.log('clicked!')
            var employer = encodeURI($(event.currentTarget).children()[5].id);
            employer = employer.replace('&', 'and')
            Meteor.call('getVendorMatch', employer, function(err, res){
                Session.set('vendorMatch', res.data[0]);
            });
            var vendor_contrib = $(event.currentTarget).children()[1]['innerText'];
            Session.set('individual_contribution', vendor_contrib);
        }
    });

    Template.vendors.vendor_name = function(){
        return Session.get('vendorMatch') ? Session.get('vendorMatch')['vendor_name'] : '';
    }
    Template.vendors.amount = function(){
        return Session.get('vendorMatch') ? Session.get('vendorMatch')['dollar_amount'] : '';
    }
    Template.vendors.contribution = function(){
        return Session.get('individual_contribution') ? Session.get('individual_contribution') : '';
    }


    Handlebars.registerHelper('arrayify',function(obj){
        result = [];
        for(var i=0; i< obj.length; i++){

            result.push({org_name:obj[i]['organization_name'], amount:obj[i]['amount'],
                        city:obj[i]['contributor_city'], person_name:obj[i]['contributor_name'],
                        occupation:obj[i]['contributor_occupation'], contrib_type:obj[i]['contributor_type'],
                        employer:obj[i]['contributor_employer']
            })
        }
        return result;
    });
}


