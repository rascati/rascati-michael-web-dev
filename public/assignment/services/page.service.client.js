(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService() {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            //works: page.websiteId = websiteId;
            //       pages.push(page);
            
            var newPage = {
                _id: (new Date()).getTime(),
                name: page,
                websiteId: websiteId
            };
            pages.push(newPage);
            return newPage;
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];

            for (var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true
                }
            }
            return false;
        }
        
    }
})();