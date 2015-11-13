Meteor.methods({
	'insertInvoice': function(invoice){
		Invoices.insert(invoice);
	}
});

Meteor.methods({
	'updateInvoice': function(invoice, id){
		Invoices.update({_id: id}, {$set: invoice});
	}
});