(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage: createPage,
            //findAllPagesForWebsite: findAllPagesForWebsite,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            console.log("website id for page: " + websiteId);
            page.websiteId = websiteId;
            return $http.post(url, page);

            /*var newPage = {
                _id: (new Date()).getTime(),
                name: page,
                websiteId: websiteId
            };
            pages.push(newPage);
            return newPage;*/
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        /*
        function findPageByWebsiteId(websiteId) {
            var url = ""

            var result = [];

            for (var i in pages) {
                if (pages[i].websiteId == websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }*/

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
            /*for (var i in pages) {
                if (pages[i]._id == pageId) {
                    return pages[i];
                }
            }
            return null;*/
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);

            /*
            for (var i in pages) {
                if (pages[i]._id == pageId) {
                    pages[i].name = page.name;
                    return true;
                }
            }
            return false;*/
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
            /*for (var i in pages) {
                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                    return true
                }
            }
            return false;*/
        }
    }
})();