(function(angular) {


  EventsService.$inject = ['Facebook', 'fbAccessToken', '$q', '$http'];

  angular
    .module('fbevents.services')
    .service('EventsService', EventsService);

  function EventsService(fb, fbToken, q, req) {


    function getStatusQuery(type) {
      if(!type) return null;
      return type + ".limit(50){name,id,picture{url}}"
    }

    function buildRequestParams() {
      var params = [];

      params.push('name');
      params.push('venue');
      params.push('description');
      params.push('start_time');
      params.push('end_time');
      params.push(getStatusQuery('attending'));
      params.push(getStatusQuery('maybe'));
      params.push(getStatusQuery('declined'));

      return 'fields=' + params.join(',');
    }


    this.getMore = function(nxtUrl) {
      if(!nxtUrl) return q.reject('Invalid request');
      return req.get(nxtUrl);
    }

    this.getDetails = function(eventId) {
      if(!eventId) return q.reject('Invalid event ID');

      var deferred = q.defer();

      fb.api('/'+ eventId + '?' + buildRequestParams() + '&access_token=' + fbToken, function(response) {
        if(response && !response.error) {
          deferred.resolve(response);
        } else {
          console.log(response ? response.error : null);
          deferred.reject('Unexpected error');
        }
      });
      return deferred.promise;
    }

  }

})(angular);