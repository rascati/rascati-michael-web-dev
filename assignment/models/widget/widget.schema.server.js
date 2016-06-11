module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: "Page"},
        type: String, enum: ["HEADING", "IMAGE", "YOUTUBE", "HTML", "INPUT"], //not sure what to do here
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String, //string
        height: String, //string
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};