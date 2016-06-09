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
                    console.log("Page List: " + response.data);
                    vm.pages = response.data;
                });
            //vm.pages = PageService.findPageByWebsiteId(websiteId);
            //console.log(vm.pages);
        }
        init();
    }
})();