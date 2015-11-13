Template.dashNav.helpers({
	navs: function(){
		return [{name: 'dashboard', label: 'Dashboard'},{name: 'invoices', label: 'Invoices'}];
	},
	selectedClass: function () {
		var navName = this.name;
    var selectedNav = Session.get('selectedNav');
    if(navName === selectedNav){
      return "active";
    }else{
      return "";
    }
	}
});

// Template.dashNav.events({
// 	'click .port': function (event, template) {
// 		Session.set('selectedNav', event.currentTarget.id);
// 	}
// });