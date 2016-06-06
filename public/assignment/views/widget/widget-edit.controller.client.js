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

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = response.data;
                });

            //vm.widget = WidgetService.findWidgetById(vm.widgetId);
            //console.log(vm.widget.widgetType);
        }
        init();

        //was updateWidget() -no params
        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(
                    function(response) {
                        vm.success = "Widget successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            /*var result = WidgetService.updateWidget(vm.widget._id, vm.widget);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Could not update widget"
            }*/
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widget._id)
                .then(
                    function(response) {
                        vm.success = "Widget successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );

            /*var result = WidgetService.deleteWidget(vm.widget._id);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error ="Could not delete widget"
            }*/
        }
    }
})();