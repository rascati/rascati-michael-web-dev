(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    
    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        vm.pageId = pageId;
        var widgetId = $routeParams.widgetId;
        vm.widgetId = widgetId;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            //console.log(vm.widget.widgetType);
        }
        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widget._id, vm.widget);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Could not update widget"
            }
        }

        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widget._id);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error ="Could not delete widget"
            }
        }

    }
})();