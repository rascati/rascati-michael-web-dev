/*
must describe array in here. properties of the user are from the array. when mongoose creates a new instance
of this data type, it will have the right fields/properties
_id is automatically added by MongoDB
*/

module.exports = function() {
    
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {
            type: String
            // required: [true, "Username is required"],
            // unique: [true, "Username is taken"]
        },
        password: {
            type: String
            // required: [true, "Password is required and needs to match"]
        },
        firstName: String,
        lastName: String,
        facebook: {
            id: String,
            displayName: String
        },
        google: {
            // google shit
        },
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: "Website"}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"}); //overrides the default name

    return UserSchema;
};