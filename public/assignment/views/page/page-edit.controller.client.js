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

        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            console.log(vm.page.name);
            var result = PageService.updatePage(vm.pageId, vm.page);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Could not update page"
            }
        }

        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Could not delete page"
            }
        }
    }
})();