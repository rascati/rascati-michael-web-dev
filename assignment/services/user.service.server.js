module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function createUser(req, res) {
        var newUser = req.body;

        for (var i in users) {
            if (users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        for (var i in users) {
            if (id === users[i]._id) {
                res.send(users[i]);
                return//;
            }
        }
        res.send({});
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        for (var i in users) {
            if (users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: " + id + " not found");
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        for (var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(404).send("Unable to remove user with ID: " + id);
    }

    ////////////////////

    function findUserByCredentials(username, password, res) {
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send(403);
    }

    function findUserByUsername(username, res) {
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send({});
    }



    /*
     app.post("/api/user", createUser);
     app.get("/api/user", getUsers);//reading a user
     app.get("/api/user/:userId", findUserById);//reading a user
     //app.get("/api/user/:username", findUserByUsername);//won't work because this matches to the same URL pattern as the one above.
     app.put("/api/user/:userId", updateUser);
     app.delete("/api/user/:userId", deleteUser);//listen for delete, invoke url delete user
     */
    /*
     function createUser(req, res) {
     var newUser = req.body;

     for (var i in users) {
     if (users[i].username === newUser.username) {
     res.status(400).send("Username " + newUser.username + " is already in use");//username is taken
     return;
     }
     }

     newUser._id = (new Date()).getTime() + "";
     users.push(newUser);
     res.json(newUser);//we are expecting the newUser object to be sending. (it is as a JSON) //successful creation of new user.
     }

     function deleteUser(req, res) {
     var userId = req.params(userId);

     //code originally living in user.service.client.js
     for (var i in users) {
     if (users[i]._id == userId) {//userId being passed is from the URL
     users.splice(i, 1);//at pos i splice 1 element
     res.send(200);
     return;
     }
     }
     res.status(404).send("Unable to remove user with ID: " + userId);
     }

     function updateUser(req, res) {
     var userId = req.params(userId);
     var newUser = req.body; //extract newUser from body of JSON object


     //code originally living in user.service.client.js
     for (var i in users) {
     if (users[i]._id == userId) {//userId being passed is from the URL
     users[i].firstName = newUser.firstName;
     users[i].lastName = newUser.lastName;//respond w a 200 to say everything went ok
     res.send(200);
     return;
     }
     }
     res.status(400).send("User with ID: " + userId + "not found");//400 is generic error
     }

     //we embedded functions in the app.get in app.js (anonymous function). this is another way to do it.
     function getUsers(req, res) {
     //base url of /api/user/, but queries are different, so it will parse through queries
     var username = req.query["username"];
     var password = req.query["password"];

     if (username && password) {
     findUserByCredentials(username, password, res);//use findUserByCredentials
     } else if (username) {
     findUserByUsername(username, res);//can generate a response with res
     } else {
     res.send(users);//typically would check for credentials
     }
     }

     function findUserByCredentials(username, password, res) {
     for (var u in users) {
     if (users[u].username === username && users[u].password === password) {
     res.send(users[u]);
     return;
     }
     }
     //send null if nothing is available
     //res.send({});
     res.send(403);//http error code: you are not authorized.
     }

     function findUserByUsername(username, res) {
     for (var u in users) {
     if (users[u].username === username) {
     res.send(users[u]);
     return;
     }
     }
     res.send({});
     }

     function findUserById(req, res) {
     var userId = req.params.userId;//userId is from app.get line where :userId is the variable name
     for (var i in users) {
     if (userId === users[i]._id) {
     res.send(users[i]);
     return;
     }
     }
     res.send({});
     }*/
};