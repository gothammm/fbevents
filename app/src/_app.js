(function(angular) {

  angular
    .module('fbevents', [
      'ngMaterial',
      'fbevents.modules.events',
      'fbevents.services'
    ]);

  /**
   * @name onLoad
   * @description
   * # Onload function fired on window.onload
   */

  function onAppLoad() {
    angular
      .element(document.querySelector('.fb-app-loading'))
      .remove();
  }

  window.onload = onAppLoad;

})(angular);  