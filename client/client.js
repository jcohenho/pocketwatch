if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to polifavor.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        alert("You pressed the button");
    }
  });
}


