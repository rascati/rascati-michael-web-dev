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
            if (website) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(
                        function(response) {
                            var newWebsite = response.data;

                            if (newWebsite) {
                                $location.url("/user/" + vm.userId + "/website");
                            }
                        },
                        function(error) {
                            vm.error = "Name is required";
                        }
                    );
            }

            /*if (website.name) {
                var newID = (new Date()).getTime();

                var website = {
                    _id: newID,
                    name: website.name,
                    developerId: vm.userId
                };
                //console.log("name: " + website.name);

                WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/" + vm.userId + "/website");

            } else {
                vm.error = "Please name the website";
            }*/
        }
    }
})();