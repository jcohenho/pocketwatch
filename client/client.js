if (Meteor.isClient) {
    Meteor.startup( function() {
        Meteor.call( 'openSession', function( err, res ) {
            console.log(res);
            if( !err) Session.set( 'data', res );
        });
    });


    Template.content.res = function () {
        return Session.get('data').content;
    };

    Template.hello.events({
        'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
            alert("You pressed the button");
        }
    });
}


