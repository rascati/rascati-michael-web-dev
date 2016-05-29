(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.userId = userId;
        vm.updateUser = updateUser;

        var id = $routeParams["userId"];
        //var index = -1;


        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
        }
        init();

        function updateUser() {
            var result = UserService.updateUser(vm.user._id, vm.user);
            if (result === true) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
    }
})();