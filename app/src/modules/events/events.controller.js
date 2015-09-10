(function(angular) {

  Events.$inject = ['$scope', '$window', '$mdToast', 'EventsService'];

  angular
    .module('fbevents.modules.events')
    .controller('EventsController', Events);


  function Events(scope, ngwindow, toast, eventsService) {
    
    scope.getEvent = function() {
      var eventId = parseUri(scope.event.url);
      scope.event.data = null;

      scope.isSearching = true;
      eventsService.getDetails(eventId).then(function(response) {
        scope.isSearching = false;
        if(response) {
          scope.event.data = response;
          scope.event.attending = response.attending;
          scope.event.maybe = response.maybe;
          scope.event.declined = response.declined;
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

    scope.saveInfo = function() {
      var data = scope.event.data;

      data.eventId = data.id;
      delete data.maybe;
      delete data.id;
      delete data.attending;
      delete data.declined;


      eventsService.saveInfo(data).then(function(res) {
        showToastMsg(res.message);
      })
      .catch(function(res) {
        showToastMsg(res.message);
      })
    }

    scope.getMore = function(type, url) {
      eventsService
      .getMore(url)
      .then(function(response) {
        var data = response.data;
        if(data && data.data) {
          scope.event[type].data = scope.event[type].data.concat(data.data);
          scope.event[type].paging = data.paging;
        } 
      })
      .catch(function(response) {
        console.log(response);
      })
    }


    function showToastMsg(msg) {
      toast.show(
        toast.simple()
          .content(msg || 'Error!')
          .position('top right')
          .hideDelay(3000)
      );
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
        data: null,
        attending: null,
        maybe: null,
        declined: null
      };
      scope.isSearching = false;
    }

    init();
  }
})(angular);