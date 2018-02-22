/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojrouter', 'getToken'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.messageText = ko.observable('Hello from Example Component');
        self.uName = ko.observable('');
        self.pWord = ko.observable('');
        self.aisURL = ko.observable('http://localhost:3001');

        var req = {};

        self.token = async function () {
          req.username = self.uName();
          req.password = self.pWord();
                    
            var state = false
            let resp = await $.ajax({
            url: self.aisURL() +'/scanZone', // "http://localhost:3001/login", // <<- ScanZone API token service
            type: 'post', // <<- the method that we using
            data: JSON.stringify(req), // <<- JSON of our request obj
            contentType: 'application/json', // <<- telling server how we are going to communicate
            fail: function(xhr, textStatus, errorThrown) {

              console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console
                return false;  
            }
          }).done(function(data, textStatus, xhr) {
            console.log(data);
//              return data
            if (data.role === 'manager') {
//                console.log('liwa')
              oj.Router.rootInstance.go('dashboard');
            } else if (data.role === 'picker') {
              console.log("Your HTML view is still under development");
            } else if (data.role === 'developer') {
                console.log('YOU ARE A DEVELOPER')
            }
            req = {}

            if (data.hasOwnProperty('userInfo')) { // <<- see example response below

              var token = data.userInfo.token;
              localStorage.setItem('token', token);
               document.dispatchEvent(event);
              // console.log("Login Token: "+token);
            }
                return true
          });
        }
            

          // let func = await getToken(req, self.aisURL());
          //   if (localStorage.getItem('token')) {
          //       oj.Router.rootInstance.go('dashboard');
          //   }
          //   else {
          //       console.log('Fail')
          //   }



        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here

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
