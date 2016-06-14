(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            createUser: createUser,
            login: login,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            //findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;
        
        
        function login(username, password) {
            //using the 'get' we encode username/password as a part of the URL (not safe)
            //using the 'post' username/password are encoded inside the body of the request. can use HTTPS
            var url = "/api/login";

            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }
        
        function createUser(username, password) {
            var url = "/api/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }
    }
})();