(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        vm.pageId = pageId;

        vm.createWidget = createWidget;


        //{"_id": "123",
        // "widgetType": "HEADER",
        // "pageId": "321",
        // "size": 2,
        // "text": "GIZMODO"},

        function createWidget(widgetType) {
            var newID = (new Date()).getTime();

            var newWidget = {
                _id: newID,
                widgetType: widgetType
            };

            WidgetService.createWidget(vm.pageId, newWidget);
            //after clicking new widget, goto: /user/:uid/website/:wid/page/:pid/widget/:wgid
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget.newID);
        }

        /*
         //widget has: _id, widgetType, pageId, size, text
         function createWidget(pageId, widget) {
         widget.pageId = pageId;
         widgets.push(widget);
         }
         */

    }
})();