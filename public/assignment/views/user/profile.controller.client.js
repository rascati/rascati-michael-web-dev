(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var id = $routeParams["userId"];

        vm.updateUser = updateUser;
        vm.unregister = unregister;

        //var id = $routeParams["id"];
        var index = -1;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = error.data;
                    }
                );
        }

        //checkmark invokes put request. to userserviceserver
        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )
        }

        /*
        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
            
            UserService
                .findUserById(id)
                .then(function(response) { 
                    
                })
        }
        init();

        function updateUser() {
            //console.log(id);
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                        //vm.error = "User not found";
                    }
                )
        }

        function unregister() {
            //delete user by ID, tell the UserService. UserService uses http delete
            UserService
                .deleteUser(id)
                .then(//needs to response with success or failure. similar to the if/else Success/Error
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }*/
    }
})();