module.exports = function(app, models) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname + "/../../public/uploads" });

    var widgetModel = models.widgetModel;

    // var widgets = [
    //     {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p><b>First HTML</b></p>"},
    //     {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/jwu2y9x5OlM"},
    //     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p><b>Second HTML</b></p>"}
    // ];

    app.post("/api/upload", upload.single("myFile"), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        // newWidget._id = (new Date()).getDate() + "";
        // console.log(newWidget);
        // widgets.push(newWidget);
        // res.json(newWidget);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        // var result = [];
        // console.log("Page ID: " + pageId);

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(error) {
                    res.status(400).send(error)
                }
            );

       //  for (var i in widgets) {
       //      if (widgets[i].pageId === pageId) {
       //          result.push(widgets[i]);
       //      }
       //  }
       // // console.log(result);
       //  res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         res.json(widgets[i]);
        //         return;
        //     }
        // }
        // res.status(404).send("Widget");
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;

        console.log(widgetId);
        console.log(newWidget);

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function(widget) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );

        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets[i].name = newWidget.name;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("Widget with ID: " + widgetId + " not found");
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send(error);
                }
            );
        
        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove widget with ID: " + widgetId);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        console.log(widgetId);
        var width         = req.body.width;
        console.log(width);
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    widget.url = "/uploads/" + filename;
                    res.json(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }
};