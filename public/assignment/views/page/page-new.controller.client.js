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
            if (name && title) {
                var newPage = PageService.createPage(vm.websiteId, name);
                if (newPage) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Could not create page";
                }
            } else {
                vm.error = "Please fill in every field";
            }

            /*works
            if (name && title) {
                var id = (new Date()).getTime();

                var newPage = {
                    _id: id,
                    name: name,
                    websiteId: vm.websiteId
                };

                PageService.createPage(vm.websiteId, newPage);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page")
            } else {
                vm.error = "Please fill in every field";
            }//*/

        }
    }
})();