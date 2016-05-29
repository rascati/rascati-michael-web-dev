(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;

        //var pages = PageService.findPageByWebsiteId(websiteId);

        function init() {
            //var websiteId = $routeParams.websiteId;
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            //console.log(vm.pages);
        }
        init();
    }
})();