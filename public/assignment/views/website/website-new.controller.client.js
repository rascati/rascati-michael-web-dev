(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (name && description) {
                var newWebsite = WebsiteService.createWebsite(vm.userId, name, description);
                if (newWebsite) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Could not create website";
                }
            } else {
                vm.error = "Please fill in every field";
            }
        }
    }
})();