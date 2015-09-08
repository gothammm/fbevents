(function(angular) {


  EventsService.$inject = ['Facebook', 'fbAccessToken', '$q'];

  angular
    .module('fbevents.services')
    .service('EventsService', EventsService);

  function EventsService(fb, fbToken, q) {


    function getStatusQuery(type) {
      if(!type) return null;
      return type + ".limit(12){name,id,picture{url}}"
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



    this.getDetails = function(eventId) {
      if(!eventId) return q.reject('Invalid event ID');

      var deferred = q.defer();

      fb.api('/'+ eventId + '?' + buildRequestParams() + '&access_token=' + fbToken, function(response) {
        if(response && !response.error) {
          var obj =  {
            attending: response.attending.data,
            maybe: response.maybe.data,
            declined: response.declined.data 
          }
          deferred.resolve(angular.extend(response, obj));
        } else {
          console.log(response ? response.error : null);
          deferred.reject('Unexpected error');
        }
      });
      return deferred.promise;
    }

  }

})(angular);