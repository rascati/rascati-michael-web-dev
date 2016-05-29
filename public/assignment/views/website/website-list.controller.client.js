(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();
    }
})();