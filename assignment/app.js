module.exports = function(app) {

    //models. app js receives the models.js, models var contains the map of all the models
    //can interact w any model you want
    //var models = require("./models/models.js")();

    var userService = require("./services/user.service.server.js")(app);//(app, models);//pass in model - allows it to interact with persisting world. must create the model now
    var websiteService = require("./services/website.service.server.js")(app);//(app, models);
    var pageService = require("./services/page.service.server.js")(app);//(app, models);
    var widgetService = require("./services/widget.service.server.js")(app);//(app, models);

    /*var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/allusers/:username", function(req,res) {
        var username = req.params["username"];
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
            }
        }
        //res.send(users);
    })*/
    //if the URL matches this URL/URL pattern, execute this function. right after localhost:3000/sayHello
    //message is a variable, not a literal. "/say/:message is a webservice endpoint. just data, not for human consumption
    /*app.get("/say/:message", function(req, res) { //lots of info available in the object req (request), including the path. request and response. res is server generating something back to incoming requst
        var msg = req.params["message"];//"message" matches to :message. var name doesn't. var holds the value of the path that came in
        res.send({message: msg});//encoded as a JSON object
        //res.send("This is the message: " + msg);
        //console.log(msg);
    });
*/
    /*
    app.get("/sayHello", function() {
       console.log("hello from the server");

    });*/


};