(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        vm = this;

        function init() {
            var websiteId = $routeParams.websiteId;
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }
})();

