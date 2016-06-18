var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: "/#/user",
            failureRedirect: "/#/login" // maybe just #/login
        }));
    app.get ("/auth/facebook", passport.authenticate('facebook', { scope : 'email' })); //want passport-fb to handle this one
                                                                  // scope allows us to configure WHAT WE WANT TO KNOW/ASK FROM FACEBOOK
    app.post("/api/login", passport.authenticate("local"), login); //if the passport auth succeeds, it calls the login function. if it fails, (return false or error) browser returns 403 (forbidden)
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.post("/api/user", /*authenticate,*/ createUser);  //authenticate me. part of user schema: boolean isAdmin. instead of authenticate, "admin"
    //app.get("/api/user", getUsers);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    //app.delete("/api/user/:userId", deleteUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);

    passport.use("local", new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // uses this when we call the passport-facebook config
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findFacebookUser(id)
            .then(
                function(user) {
                    // create user if null
                    // set current user to user if user exists
                    if (user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ""),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };

                        return userModel
                            .createUser(user);
                    }
                }
            )
            .then(
                function(user) {
                    return done(null, user);
                }
            );

        console.log(profile);
    }

    function authenticate(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error, null);
                }
            );
    }
    
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error) {
                    if (error) {
                        return done(error);
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else { //user doesn't exist. createUser
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
                    console.log(user);
                    res.send(200);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    // found this on stack overflow to display errors from the mongoose schema.
                    // not entirely working; just a practice
                    for (field in error.errors) {
                        res.status(400).send(error.errors[field].message); //"Username: " + newUser.username + " is already taken"
                    }
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(403).send(error);
                }
            );
    }


    function findUserByUsername(username, res) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
                function(error){
                    res.status(404).send("Unable to find user with username: " + username);
                }
            );
    }
};