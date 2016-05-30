(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            if (website.name) {
                var newID = (new Date()).getTime();

                var website = {
                    _id: newID,
                    name: website.name,
                    developerId: vm.userId
                };
                console.log("name: " + website.name);
                console.log("dev ID from new controller: " + website.developerId);

                WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/" + vm.userId + "/website");

            } else {
                vm.error = "Please name the website";
            }
        }
    }
})();