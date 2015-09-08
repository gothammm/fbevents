(function(angular) {

  Configure.$inject = ['FacebookProvider'];

  angular
    .module('fbevents.services')
    .config(Configure)
    .value('fbAccessToken', 'CAAO16Cg8ZChcBAI2CZCOnYoodkHh65U4EmtMBaFTQ7EdFvyAWSHyFTC1S4CNLnZCpggSg8L4KioVRukFrLVAFm1zXjMFytZA3txecSZCMVqlDwviOLKgFPCj6o47M4nzWr68vZAeAVcZAUGuQ6nny13HlrGV9zsiDm5zsb8h8svuP1IIzJ578vP');


  function Configure(fbProvider) {
    fbProvider.init('1044433642257943');
  }

})(angular);