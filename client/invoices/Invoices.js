Template.Invoices.onCreated(function(){
	Session.set('selectedNav', 'invoices');
	var self = this;
	self.autorun(function(){
		self.subscribe('userInvoices');
	});
});

Template.Invoices.helpers({
	invoices: ()=> {
		return Invoices.find({});
	}
});