module.exports = function() {

    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/cs4550summer1");

    //Connecting to the .model.server.js, returns an API that has all the CRUD functions.
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
}