(function(angular) {
  Configure.$inject = ['$routeProvider'];

  angular
    .module('fbevents.modules.events')
    .config(Configure);

  function Configure(route) {
    route
      .when('/events', {
        controller: 'EventsController',
        templateUrl: 'views/events/main.html'
      })
      .otherwise({
        redirectTo: '/events'
      });
  }
})(angular);