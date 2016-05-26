(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce) {
        var vm = this;
        vm.createWidget = createWidget;

        vm.widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p><b>First HTML</b></p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/jwu2y9x5OlM" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p><b>Second HTML</b></p>"}
        ];

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