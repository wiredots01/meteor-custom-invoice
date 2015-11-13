Invoices = new Mongo.Collection('invoices');

Invoices.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});


Jobs = new SimpleSchema({
	name: {
		type: String
	},
	cost: {
		type: Number
	},
	unit: {
		type: Number
	}
});

Taxes = new SimpleSchema({
	name: {
		type: String
	},
	percentage: {
		type: Number
	}
});


InvoiceSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
	},
	address: {
		type: String,
		label: "Address",
	},
	phone: {
		type: String,
		label: "Phone",
	},
	email: {
		type: String,
		label: "Email",
	},
	note: {
		type: String,
		label: "Note",
		optional: true
	},
	forms:{
		type: String
		
	},
	jobs:{
		type: [Jobs]
		
	},
	taxes:{
		type: [Taxes]

	},
	createdBy: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
		},
		autoform:{
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date();
		},
		autoform:{
			type: "hidden"
		}
	}
});

Invoices.attachSchema( InvoiceSchema );