(function(){
    angular
        .module("Thrifty")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var vm = this;

        vm.buy = buy;
        vm.sell = sell; //probably just href that links in the view, goes to login/register page

        //GOTO a search page
        function buy() {
            
        }
    }
})();