(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams["userId"];

        vm.updateUser = updateUser;

        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
        }
        init();

        function updateUser() {
            console.log(id);
            var result = UserService.updateUser(id, vm.user);
            if (result) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
    }
})();