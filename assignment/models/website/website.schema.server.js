var mongoose = require("mongoose");//does this need to be inside the function?.. answer: doesn't matter

module.exports = function() {

    //need relationship betw user that's logged in
    //user has array of websites AND/OR website knows who user is who created it
    var WebsiteSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, //User matches to "var User = mongoose.model("User", UserSchema);" in usermodel
        name: String,
        description: String,
        pages: [Page], //what do here
        dateCreated: { type: Date, default: Date.now }
    }, {collection: "assignment.website"});  //Maybe: }, {collection: "assignment.website"});

    return WebsiteSchema;
    //need model that uses the schema to be able to talk to the database
}