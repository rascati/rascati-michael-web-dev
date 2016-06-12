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

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function(response) {
                    vm.pages = response.data;
                });
        }
        init();
    }
})();