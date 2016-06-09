module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        //console.log("in the page server");
        //console.log("Body" + req.body);
        
        //req.body.name is undefined
        var newPage= req.body;
        console.log("server req.body.name");
        console.log(req.body.name);

        newPage._id = (new Date()).getTime() + "";
        newPage.name = req.body.name;
        newPage.websiteId = req.params.websiteId;

        //console.log("body: " + req.body);

        //newPage.websiteId = req.params.websiteId;
        //var newPage = req.body;
        //var websiteId = req.params.websiteId;

        // var newPage = {
        //     _id: (new Date()).getTime() + "",
        //     name: req.body,
        //     websiteId: req.params.websiteId
        // };

        //req.body.name -> undefined
        //req.body -> {}

        pages.push(newPage);
        res.json(newPage);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
       // console.log("Website ID: " + websiteId);

        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                result.push(pages[i]);
            }
        }
        console.log(result);
        res.send(result);
    }

    function findPageById(req, res) {
        //does this need to be params.pageId
        var pageId = req.params._id;

        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;

        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: " + pageId + " not found");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove page with ID: " + pageId);
    }
};