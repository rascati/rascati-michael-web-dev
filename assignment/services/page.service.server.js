module.exports = function(app, models) {

    var pageModel = models.pageModel;
    

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        //console.log("in the page server");
        //console.log("Body" + req.body);

        var websiteId = req.params.websiteId;
        var page = req.body;

        //console.log(websiteId);
        //console.log("from page service server");
        //console.log(page);

        pageModel
            .createPage(websiteId, page)
            .then(
                function(page) {
                    res.json(page);
                    //console.log(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );


/*    var newPage= req.body;
        //console.log("server req.body.name");
        //console.log(req.body.name);

        newPage._id = (new Date()).getTime() + "";
        newPage.name = req.body.name;
        newPage.websiteId = req.params.websiteId;
*/



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

    /*pages.push(newPage);
        res.json(newPage);*/
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

/*
        var websiteId = req.params.websiteId;
        var result = [];
       // console.log("Website ID: " + websiteId);

        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                result.push(pages[i]);
            }
        }
        console.log(result);
        res.send(result);*/
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        console.log("findpagebyID, ID: ");
        console.log(pageId);
        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                    console.log("page");
                    console.log(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        /*
        //does this need to be params.pageId
        var pageId = req.params._id;

        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});*/
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;

        //console.log(pageId);
        //console.log(newPage);
        pageModel
            .updatePage(pageId, newPage)
            .then(
                function(page) {
                    res.send(200);
                    //console.log(page);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );

        /*for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Page with ID: " + pageId + " not found");*/
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove page with ID: " + pageId);
                }
            );

        /*
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove page with ID: " + pageId);*/
    }
};