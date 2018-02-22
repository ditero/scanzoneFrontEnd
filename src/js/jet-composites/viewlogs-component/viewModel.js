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
            
            var pickerLog;
                
            let pickers = new Promise(function(resolve, reject){
                $.ajax({
                url: 'http://localhost:3001/manager',
                type: 'get',
                contentType: 'application/json',
                fail: function(xhr, textStatus, errorThrow) { //if the request fail print the error
                  console.log(xhr, textStatus, errorThrow);
                }
              }).done(function(results) { //if successful print the token
                  resolve(results);
              });
            });  
            
            pickers.then(function(data) {
                pickerLog = data;
                console.log(pickerLog[0].Log)
            });
            
            
                self.nameSearch = ko.observable();
                self.userID = ko.observable();
            
                self.filteredEmployees = ko.pureComputed(function() {
                  var nameSearch = self.nameSearch();

                  var findByName = function(logs) {
                    return Lazy(logs.Picker_Username).contains(nameSearch);
                  };

                  if (!nameSearch) {
                    // no filter criteria so return all employees
                    return pickerLog;
                  }

                  return Lazy(pickerLog)
                    .filter(findByName)
                    .value();
              });
            
            $( document ).ready(function() {
                console.log( "ready!" );
                self.filteredEmployees()
            });
            
            self.logOut = function(){
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              oj.Router.rootInstance.go('login');
//                var url = window.location.href;
//                window.history.go(-window.history.length);
//                window.location.href = url;
                
            }
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