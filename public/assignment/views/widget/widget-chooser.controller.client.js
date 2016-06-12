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

        function createWidget(widgetType) {
            // var newWidget = {
            //     type: widgetType
            // };
            //
            // console.log("widgetType from chooser: " + widgetType);

            WidgetService
                .createWidget(vm.pageId, {type : widgetType})
                .then(
                    function(response) {
                        var newWidget = response.data;
                        console.log(newWidget);
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                    },
                    function(error) {
                        vm.error = "Unable to create widget";
                    }
                );
        }
    }
})();

/*(function(){
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

        function createWidget(widgetType) {
            var newID = (new Date()).getTime();

            var newWidget = {
                _id: newID,
                widgetType: widgetType
            };

            WidgetService.createWidget(vm.pageId, newWidget);
            //after clicking new widget, goto: /user/:uid/website/:wid/page/:pid/widget/:wgid
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }

    }
})();*/