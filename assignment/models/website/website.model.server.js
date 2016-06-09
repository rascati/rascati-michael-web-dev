var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,//might have different name in last assignment's code
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsite(userId, website) {
        website.developerId = userId;
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
        //want to use find because there's going to be 0 or more websites.
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return Website.update(
            {_id: websiteId},
            {$set :
                {
                    name: website.name,
                    description: website.description
                }
            }
        );
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};