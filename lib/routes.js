FlowRouter.route('/', {
	name: 'home',
	action(){
		BlazeLayout.render('HomeLayout',{page: 'Home'});
	}
});

FlowRouter.route('/invoices', {
	name: 'invoices',
	action(){
		BlazeLayout.render('DashboardLayout',{main: 'Invoices'});
	}
});

FlowRouter.route('/dashboard', {
	name: 'dashboard',
	action(){
		BlazeLayout.render('DashboardLayout',{main: 'Dashboard'});
	}
});

FlowRouter.route('/new-invoice', {
	name: 'new-invoice',
	action(){
		if( ! Meteor.userId()) {
      FlowRouter.go('home');     
   	}else{
			BlazeLayout.render('HomeLayout',{page: 'NewInvoice'});
		}
	}
});

FlowRouter.route('/edit-invoice/:id', {
	name: 'edit-invoice',
	action(params){
		if( ! Meteor.userId()) {
      FlowRouter.go('home');     
   	}else{
   		Meteor.subscribe('singleInvoice', params.id);
			BlazeLayout.render('HomeLayout',{page: 'EditInvoice'});
   	}
		
	}
});



