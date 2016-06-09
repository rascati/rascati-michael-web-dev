/*module.exports = function() {
    //connect to db

    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/cs4550summer1");//if mongodb doesn't find the db it will create it


    //all models go in here
    //each model provides us w api that allows us to interact w users. create them, insert, find them by username etc
    //


    //usermodelserver returns an api that has all the crud functions. so userModel has the api
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();;
    
    //store all the models in the map
    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    
    return models;
};*/