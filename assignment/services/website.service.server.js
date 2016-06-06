module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];
    
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    
    function createWebsite(req, res) {
        //check if website doesn't have a name here?
        var newWebsite = req.body;
        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res) {
        //params.userId "userId" is the :userId in the url. ie, dev id wouldn't work
        var developerId = req.params.userId;
        var result = [];
        console.log("Dev ID: " + developerId);
        
        for (var i in websites) {
            if (websites[i].developerId === developerId) {
                result.push(websites[i]);
            }
        }
        console.log(result);
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params._id;

        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send({});
    }
    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = newWebsite.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: " + websiteId + " not found");
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + websiteId);
    }
};