(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    
    function EditWidgetController() {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        vm.pageId = pageId;

        function init() {
            vm.widget = WidgetService.findWidgetByPageId(vm.pageId);
        }
        init();

        vm.updateWidget = updateWidget;

        function updateWidget() {
            var result = WidgetService.updateWidget(vm.widget._id, widget);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Could not update widget"
            }
        }

    }
})();