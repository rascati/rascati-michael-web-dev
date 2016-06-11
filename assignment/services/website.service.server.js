module.exports = function(app, models) {

    var websiteModel = models.websiteModel;


    /*var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];*/
    
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    
    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body; // or req.body.name?
        //console.log("req.body._id from server");
        //console.log(req.body._id);


        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(website) {
                    //console.log("json website")
                    //console.log(res.json(website));
                    res.json(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );


        //console.log("req.body.name: " + req.body.name);
        //console.log("req.body: " + req.body);

        /*
        var nw = {
            _id:(new Date()).getTime() + "",
            name: req.body.name,
            developerId: userId
        };*/
        //console.log(nw);
        
        //check if website doesn't have a name here?

        //websites.push(nw);
        //res.json(nw);
    }
        // var newWebsite = req.body;
        // newWebsite._id=
        // newWebsite.developerId = userId;
        // //var website = req.body;
    // var newWebsite = {
    //     _id :(new Date()).getTime() + "",
    //     developerId : userId,
    //     name : req.body
    //
    // };
        /*
        websiteModel
            .createWebsite(userId, website)
            .then(
                function(website) {
                    res.send(200);
                    //i think this response was res.json(website)
                },
                function(error) {
                    res.status(400).send(error);
                }
            )

        */

    function findAllWebsitesForUser(req, res) {
        //params.userId "userId" is the :userId in the url. ie, dev id wouldn't work
        var developerId = req.params.userId;
        //var result = [];

        websiteModel
            .findAllWebsitesForUser(developerId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        /*websiteModel
            .findAllWebsitesForUser(developerId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    
                }
            );
        */


       // console.log("Dev ID: " + developerId);
        /*
        for (var i in websites) {
            if (websites[i].developerId === developerId) {
                result.push(websites[i]);
            }
        }
       // console.log(result);
        res.send(result);*/
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params._id;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        /*
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send({});*/
    }
    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function(website) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
        
        /*
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = newWebsite.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: " + websiteId + " not found");*/
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove website with ID: " + websiteId);
                }
            );

        /*
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + websiteId);*/
    }
};