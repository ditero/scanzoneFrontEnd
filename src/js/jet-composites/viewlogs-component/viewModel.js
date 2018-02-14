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
  
              var employees = [
                {id: 101, name: "Beauregard Duke"},
                {id: 102, name: "Lucas Duke"},
                {id: 103, name: "Daisy Duke"},
                {id: 201, name: "Cooter Davenport"},
                {id: 301, name: "Jefferson Davis Hogg"},
                {id: 302, name: "Lulu Coltrane Hogg"},
                {id: 401, name: "Rosco P Coltrane"}
              ];
  
              self.nameSearch = ko.observable();
              self.userID = ko.observable();

              self.filteredEmployees = ko.pureComputed(function() {
                  var nameSearch = self.nameSearch();

                  var findByName = function(empl) {
//                      console.log(empl.id)
                    return Lazy(empl.name).contains(nameSearch);
//                       let oupt = Lazy(empl.name).contains(nameSearch);
//                      console.log(oupt)
                  };
                  
//                  var userIDsearch = self.userID();
//                  
//                  var findByUserID = function(empl) {
////                      console.log(empl)
//                      let search = Number(userIDsearch)
//                      console.log(search)
////                      return Lazy(empl.id).contains(search);
//                      let oupt = Lazy(empl.id).contains(userIDsearch);
//                      
//                      console.log(oupt)
//                  }

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