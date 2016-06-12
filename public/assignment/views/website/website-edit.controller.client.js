(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                        vm.success = "Website successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website");
                        vm.success = "Website successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();