(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        var websiteId = $routeParams.websiteId;
        vm.websiteId = websiteId;
        var pageId = $routeParams.pageId;
        vm.pageId = pageId;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = response.data;
                });
        }
        init();


        function updatePage() {
            if (vm.page.name) {
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(
                        function(response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                            vm.success = "Page successfully updated";
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    );
            } else {
                vm.error = "need name";
            }
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        vm.success = "Page successfully deleted";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();