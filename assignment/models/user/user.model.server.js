/*module.exports = function() {
    //same exact api in the webservice on the client side. controller receive commands, get sent to client webservice.
    //that was translated to http and reached the server. now going to data model and interact w database as opposed to a local array

    var UserSchema = require("./user.schema.server.js")();
    //create mongoose model object to talk to db
    var User = mongoose.model("User", UserSchema); //the actual object that will let us talk to DB. has CRUD operations from command line. can now do it through this objc
    //when we say createUser, it will validate that against our schema. validate types ie: dates, error for string/int invalid types

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    //need mongoose to interact w db
    //must declare what a "User" is to us (schema), new file

    //pass user instance. probably json object from client, parse from the body. passed to us from server. now save it to db
    function createUser(user) {
        //this is an asynch call to db
        //same thing as http.get. returns a promise, will come back when the db is done saving

        return User.create(user);

        //stores it in the database. equivalent of INSERT in SQL.
        //mongodb is running in a different server than node.js
        //this is a network connection out to DB server, must wait for db to come back
        //same challenges betw browser and node.js
        //node is also communicating asynchronously with the db
    }

    function findUserById(userId) {
        //when you know there's only 1 thing that matches. also doesn't return an array, it returns a single instance object or NULL

        return User.findById(userId);

        //return to fulfill the asynch shit
        //User.find({_id: userId}); //can find multiple things, everything that matches. but _id is unique
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});

        //findOne finds only one, not an array

        //provide criteria: User instance matches username+password to username+password params
        //.find finds all usernames that match. designed to return COLLECTIONS. will also return an array of 1
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set :
                {   //sets first instance of _id's firstName field to the browser param newUser.firstName
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }//fields to modify. can't change username
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};*/