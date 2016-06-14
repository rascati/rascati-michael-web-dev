module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;


    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update(
            {_id: widgetId},
            {$set: widget
                // {   //which of these should be changeable?
                //     name: widget.name,
                //     text: widget.text,
                //     placeholder: widget.placeholder,
                //     description: widget.description,
                //     url: widget.url,
                //     width: widget.width,
                //     height: widget.height,
                //     rows: widget.rows,
                //     size: widget.size,
                //     class: widget.class,
                //     icon: widget.icon,
                //     deletable: widget.deletable,
                //     formatted: widget.formatted*/
                // }
            }
        );
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {

    }
};