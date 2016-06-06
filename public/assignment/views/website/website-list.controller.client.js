(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["userId"];
        vm.userId = userId;
        //var userId = $routeParams.userId;
        //var id = $routeParams["userId"];


        function init() {
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .then(function(response) {
                    vm.websites = response.data;
                });

            //vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();

        /*
        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();*/
    }
})();