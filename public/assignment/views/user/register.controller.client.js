(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verify) {
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
        }
    }
})();