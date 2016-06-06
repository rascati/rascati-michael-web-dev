(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;

        vm.createPage = createPage;

        function createPage(name, title) {

            PageService
                .createPage(vm.websiteId, name)
                .then(
                    function(response) {
                        var newPage = response.data;

                        if (newPage) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                    },
                    function(error) {
                        vm.error = "Unable to create page";
                        console.log("page name: " + name);
                    }
                );

            /*if (name && title) {
                var newPage = PageService.createPage(vm.websiteId, name);
                if (newPage) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Could not create page";
                }
            } else {
                vm.error = "Please fill in every field";
            }*/
        }
    }
})();