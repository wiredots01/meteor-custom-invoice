Meteor.publish('userInvoices', function(){
	return Invoices.find({createdBy: this.userId});
});

Meteor.publish('singleInvoice', function(id){
	check(id, String);
	return Invoices.find({_id: id});
});

// Meteor.publish('posts', function(){
// 	return Posts.find();
// });
