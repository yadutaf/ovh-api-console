angular.module( 'consoleApp', [
  'ngSanitize',
  'ui.bootstrap',
  'ui.router',
  'templates-app',
  'templates-common',
  'ngOvh'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/' );
})

.config(function (OvhProvider) {
    // TODO: move credentials to dedicated config file
    // TODO: add endpoint configuration
    // TODO: add timeout to API calls
    // TODO: afficher les liste de manière selectionable / table
    // TODO: il y a une convention, on doit pouvoir générer une drop down en faisant les calls sur le parent voire afficher un nom / description quand dispo
    // TODO: state --> soit tout à droite, soit tout à gauche, fixed width
    // TODO: document authentication / statuses
    // TODO: afficher les routes de manière hierarchiques avec pretty print optionel  --> /ipLoadbalancing/{serviceName}/http/farm/{farmId}/server/{serverId}
    //       --> ipLoadbalancing --> http --> farm --> server (list, show, create, delete, edit)

    // Set the Application Key (AK):
    OvhProvider.setAppKey('MrF2qQV75ktbSv86');

    // Set the Application Secret (AS):
    OvhProvider.setAppSecret('W6XsGCPi6pkvVn7nuXMhZSkoOUR1xNUQ');

    // Set the API Base Path
    OvhProvider.setBaseUrl('https://api.ovh.com/1.0');

    // Returns complete data
    OvhProvider.setPreventReturnData(true);

})

.run(function () {
    $.scrollUp({
        scrollImg: true
    });
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | My Little API' ;
    }
  });
})

;

