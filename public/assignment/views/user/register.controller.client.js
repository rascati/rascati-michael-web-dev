(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username && password && verifyPassword) {
                if (UserService.findUserByUsername(username)) {
                    console.log("username taken");
                    vm.error = "This username is taken";
                } else {
                    //Username is unique, proceed with registration
                    if (password === verifyPassword) {
                        //passwords match, create an account
                        var newID = (new Date()).getTime();

                        var newUser = {
                            _id: newID,
                            username: username,
                            password: password
                        }
                        UserService.createUser(newUser);
                        $location.url("/user/" + newID + "");

                    } else {
                        vm.error = "Your passwords don't match";
                    }
                }
            } else {
                console.log("empty fields");
                vm.error = "Please fill every field in";
            }


        }
    }
})();

/*
 function login(username, password) {
 var user = UserService.findUserByUsernameAndPassword(username, password);
 if (user) {
 var id = user._id;
 $location.url("/user/" + id);
 } else {
 vm.error = "User not found";
 }
 }
 */