module.exports = function() {
    //must describe array in here. properties of the user are from the array. when mongoose creates a new instance
    //of this data type, it will have the right fields/properties

    var mongoose = require("mongoose");

    //email isn't in the hardcoded array fyi
    //can hard code limits on things like zip codes, or default values on dateCreated
    var UserSchema = mongoose.Schema({
        //_id is automatically added by MongoDB
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date //maybe a date i have to provide, not hardcoded
    }, {collection: "assignment.user"}); //mongoose chooses a default name for the schema. going to provide a name as a configuration object

    //only 1 db in openshift.
    //namespace it "assignment.user"

    return UserSchema;
};