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

            //vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        //was updatePage()
        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

                        vm.success = "Page successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        
        /*
        function updatePage() {
            //console.log(vm.page.name);
            var result = PageService.updatePage(vm.pageId, vm.page);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Could not update page"
            }
        }*/

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(
                    function(response) {
                        vm.success = "Page successfully deleted";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        /*
        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Could not delete page"
            }
        }*/
    }
})();