(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            website.developerId = userId;
            return $http.post(url, website);
        }
        
        /*
        function createUser(username, password) {
            var url = "/api/user";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }*/

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
            
            /*
            var result = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
            */
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);

            /*
            for (var i in websites) {
                //console.log("website: " + websites[i]._id);
                if (websites[i]._id == websiteId) {
                    return websites[i];
                }
            }
            return null;*/
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);

            /*for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    return true;
                }
            }
            return false;*/
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();