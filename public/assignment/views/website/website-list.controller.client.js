(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        vm = this;
        
        function init() {
            var userId = $routeParams.userId;
            
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();
    }
})();