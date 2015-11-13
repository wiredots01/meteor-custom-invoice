
Template.EditInvoice.onRendered(function(){
  myinvoice = new Formbuilder({
    selector: '#customFields',
    bootstrapData: JSON.parse(Session.get('forms'))
  });

  myinvoice.on('save', function(payload){
    var data = JSON.parse(payload);
    Session.set('forms', JSON.stringify(data.fields));
  })
  myinvoice.views;

});


Template.EditInvoice.helpers({
	invoice: ()=> {
		var id = FlowRouter.getParam('id');
		var currentInvoice = Invoices.findOne({_id: id});
		if(currentInvoice){
			Session.set('jobs', currentInvoice.jobs);
			Session.set('taxes', currentInvoice.taxes);
			Session.set('forms', currentInvoice.forms);
		}
		return currentInvoice;
	},

  jobs: function () {
    return Session.get('jobs');
  },
  unitCost: function(){
    return Number(this.cost) * Number(this.unit);
  },
  subTotal: function(){
    var total = 0;
    _.each(Session.get('jobs'), function(job){
      total += (Number(job.cost) * Number(job.unit));
    });
    return total;
  },
  taxes: function(){
    return Session.get('taxes');
  }
});

Template.EditInvoice.events({
  'submit #updateInvoiceForm': function (event, template) {
    event.preventDefault();
    
    var id = event.target.invoiceId.value;
    var data = {
      name: event.target.name.value,
      address: event.target.address.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      note: event.target.note.value,
      forms: Session.get('forms'),
      jobs: Session.get('jobs'),
      taxes: Session.get('taxes')
    };
    console.log("updating !", data);

    Meteor.call('updateInvoice', data, id, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error('errr', error.reason);
      }else{
        console.log("saveb by the bell!")
        toastr.success('', 'Invoice updated!');
        FlowRouter.go('invoices')
      }
    });
  },

  'click .addJob': function(event, template){
    
    if($('#jobCost').val() != '' && $('#jobUnit').val() != ''){
      var data = {
        name: $('#jobName').val(),
        cost: $('#jobCost').val(),
        unit: $('#jobUnit').val()
        
      }

      var currentJobs = Session.get('jobs');
      currentJobs.push(data);
      Session.set('jobs', currentJobs);
      toastr.success('', 'Job added!');
      $('#jobCost').val('');
      $('#jobUnit').val('');
    }else{
      toastr.error('Error', 'Complete the fields!');
    }
    


  },

  'click .addTax': function(event, template){
    console.log("adding tax");
    var data = {
      name: $('#taxName').val(),
      percentage: 0
    }

    var currentTaxes = Session.get('taxes');
    currentTaxes.push(data);
    Session.set('taxes', currentTaxes);
    toastr.success('', 'Tax added!');

  }

});