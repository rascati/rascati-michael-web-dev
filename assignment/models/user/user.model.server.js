/*

Same exact API in the User WebService on the client side.
Controller receives commands, commands get sent to the client WebService
That was translated to HTTP and reached the server.
Now it's going to the data model and interacting with the database
as opposed to the local array of hardcoded data.

 */

/*
    var UserSchema = require("./user.schema.server.js")();
    //create mongoose model object to talk to db
    var User = mongoose.model("User", UserSchema); //the actual object that will let us talk to DB. has CRUD operations from command line. can now do it through this objc
    //when we say createUser, it will validate that against our schema. validate types ie: dates, error for string/int invalid types

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

};*/


module.exports = function() {

    var mongoose = require("mongoose");
    
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;


    //Creates a new user instance
    //Must return to fulfill the asynch call
    function createUser(user) {
        return User.create(user);
    }

    //Retrieves a user instance whose _id is equal to parameter userId
    function findUserById(userId) {
        return User.findById(userId);
    }

    //Retrieves a user instance whose username is equal to parameter username
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    //Retrieves a user instance whose username and password are equal to parameters userId and password
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    //Updates user instance whose _id is equal to parameter userId
    //sets first instance of _id's firstName and lastName field to the browser param user.firstName/lastName
    function updateUser(userId, user) {
        return User.update(
            {_id: userId},
            {$set:
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        );
    }

    //Removes user instance whose _id is equal to parameter userId
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};