/**
 * Created by Michael on 5/23/2016.
 */

(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    //routeprovider; provided by angular routing module. allows to configure routes
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            });
    }
})();