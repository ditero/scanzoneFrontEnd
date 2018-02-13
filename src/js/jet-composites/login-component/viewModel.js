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
        self.uName = ko.observable('jdesys');
        self.pWord = ko.observable('steltixE1');
        self.aisURL = ko.observable('http://sandbox921.steltix.com');

        var req = {};

        req.username = self.uName();
        req.password = self.pWord();

        self.token = async function () {
          let func = await getToken(req, self.aisURL());
            if (localStorage.getItem('token')) {
                oj.Router.rootInstance.go('dashboard');
            }
            else {
                console.log('Fail')
            }
            
        }


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
