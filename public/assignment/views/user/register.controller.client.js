(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;

        vm.register = register;

        // function register(username, password, verify) {
        //     UserService
        //         .createUser(username, password)
        //         .then(
        //             function(response) {
        //                 var user = response.data;
        //                 $location.url("/user/" + user._id);
        //             },
        //             function(error) {
        //                 vm.error = error.data;
        //             }
        //         );
        // }

        function register(username, password, verify) {
            UserService
                .register(username, password)
                .then(
                    function(response) {
                        var user = response.data;

                        console.log(user);

                        if (user.username != null && user.password != null) {
                            $rootScope.currentUser = user; //
                            var id = user._id;
                            $location.url("/user/" + id);
                        } else { // hopefully a temporary fix
                            vm.error = "User not found";
                        }
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }
        // function register(username, password, verify) {
        //     UserService
        //         .register(username, password)
        //         .then(
        //             function(response) {
        //                 var user = response.data;
        //                 $rootScope.currentUser = user; // cache fact that we have current user
        //                 //$location.url("/user/" + user._id);
        //             },
        //             function(error) {
        //                 vm.error = error.data;
        //             }
        //         );
        // }
        
        /*function register(username, password, verify) {
            //do as much validation on client side before it reaches the server
            UserService
                .createUser(username, password)
                .then(
                    function(response) {
                        //successfully added to community -> goto profile page. new user passed back w userId so we can nav to the profile page
                        var user = response.data;
                        $location.url("/user/" + user._id);
                    },
                    function(error) {
                        //can only validate the usernames, password matches on the server.
                        vm.error = error.data;
                    }
                );

            if (username) {
                if (UserService.findUserByUsername(username)) {
                    vm.error = "This username is taken";
                } else {
                    //username is unique, proceed with registration
                    if (password && verify) {
                        if (password === verify) {
                            //passwords match, create an account

                            var newID = (new Date()).getTime();

                            var newUser = {
                                _id: newID,
                                username: username,
                                password: password,
                                firstName: username + " F Name",
                                lastName: username + " L Name"
                            }
                            //console.log("username: " + username);

                            UserService.createUser(newUser);
                            $location.url("/user/" + newUser._id);
                        } else {
                            vm.error = "Your passwords don't match";
                        }
                    } else {
                        vm.error = "Please verify your passwords";
                    }
                }
            } else {
                vm.error = "Username cannot be blank";
            }
        }*/
    }
})();