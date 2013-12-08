if (Meteor.isClient) {
    Meteor.startup( function() {
        Meteor.call( 'openSession', function( err, res ) {
            if( !err) Session.set( 'google-data', res );
        });
    });


    Template.content.officials = function () {
        return Officials.find();
    };


}


