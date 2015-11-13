Template.Invoices.onCreated(function(){
  
});

Template.NewInvoice.onRendered(function(){
  Session.set('jobs', []);
  Session.set('taxes', []);
  Session.set('forms', []);
	
  myinvoice = new Formbuilder({
    selector: '#customFields',
    bootstrapData: [
      {"label":"Field 1","field_type":"text","required":false,"field_options":{"size":"medium","description":""},"cid":"c8"}
    ]
  });
  myinvoice.on('save', function(payload){
    var data = JSON.parse(payload);
    console.log("fields", data.fields);
    Session.set('forms', JSON.stringify(data.fields));

  })
  myinvoice.views;
  

});

Template.NewInvoice.events({
  'submit #insertInvoiceForm': function (event, template) {
    event.preventDefault();
    

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
    console.log("saving !", data);

    Meteor.call('insertInvoice', data, function(error, result){
      if(error){
        console.log("error", error);
        toastr.error('errr', error.reason);
      }else{
        console.log("saveb by the bell!")
        toastr.success('', 'Invoice added!');
        FlowRouter.go('invoices')
      }
      // event.target.title.value = '';
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

Template.NewInvoice.helpers({
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