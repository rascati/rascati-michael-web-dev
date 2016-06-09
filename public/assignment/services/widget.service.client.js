(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

  
    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        }
        return api;


        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            console.log("pageID from widgetserviceclient: " + pageId);
            widget.pageId = pageId;
            return $http.post(url, widget);
            //widget.pageId = pageId;
            //widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
            /*
            var result = [];
            for (var i in widgets) {
                //console.log(widgets[i]);
                if (widgets[i].pageId == pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;*/
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
            /*for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
            return null;*/
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
            /*for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;*/
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);

            /*for (var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;*/
        }
    }
})();