(function(angular) {

  Events.$inject = ['$scope', '$window', 'EventsService'];

  angular
    .module('fbevents.modules.events')
    .controller('EventsController', Events);


  function Events(scope, ngwindow, eventsService) {
    
    scope.getEvent = function() {
      var eventId = parseUri(scope.event.url);
      scope.event.data = null;

      scope.isSearching = true;
      eventsService.getDetails(eventId).then(function(response) {
        scope.isSearching = false;
        if(response) {
          scope.event.data = response;
        } else {
          console.log(response);
        }
      })
      .catch(function(err) {
        scope.isSearching = false;
        console.log(err);
      })
    }

    scope.showProfile = function(userId) {
      if(userId) {
        ngwindow.open('https://facebook.com/' + userId, '_blank');
      }
    }


    function parseUri(uri) {
      var parser = document.createElement('a');
      parser.href = uri;
      var pathname = parser.pathname;
      pathname = pathname.replace(/events/g, '');
      pathname = pathname.replace(/\//g, '');
      return Number(pathname) || 0;
    }

    function init() {
      scope.event = {
        url: '',
        data: null
      };
      scope.isSearching = false;
    }

    init();
  }
})(angular);