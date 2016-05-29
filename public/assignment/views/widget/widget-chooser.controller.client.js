(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce) {
        var vm = this;
        vm.createWidget = createWidget;
        
        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: widgetType
                //widgets have more params than just these two
            };
            //happens in service
            widgets.push(newWidget);
        }
    }
})();