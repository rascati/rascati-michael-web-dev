module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page"
        },
        type: {
            type: String,
            enum: ["HEADER", "IMAGE", "YOUTUBE", "HTML", "TEXT"]
        },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String, // number
        height: String, // number
        rows: Number, // number
        size: String, // number
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};