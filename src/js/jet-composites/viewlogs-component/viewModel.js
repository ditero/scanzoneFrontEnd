/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'getLogs'], function (oj, ko, $) {
    'use strict';
    
    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Example Component');

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            
            //Parse your component properties here 
            self.nameSearch = ko.observable();
  
  self.filteredEmployees = ko.pureComputed(function() {
      var nameSearch = self.nameSearch();

      var findByName = function(empl) {
        return Lazy(empl.name).contains(nameSearch);
      };
  
      if (!nameSearch) {
        // no filter criteria so return all employees
        return employees;
      }
      
      return Lazy(employees)
        .filter(findByName)
        .value();
  });
            

        });
    };
    
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});