if (Meteor.isClient) {
    Meteor.startup( function() {
        Meteor.call( 'openSession', function( err, res ) {
            if( !err) Session.set( 'google-data', res );
        });
    });


    Template.content.officials = function () {
        return Officials.find();
    };

    Template.hello.events({
        'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
            alert("You pressed the button");
        }
    });
}


