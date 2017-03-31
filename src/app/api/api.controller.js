angular.module('consoleApp').controller('ApiCtrl', function ($scope, $timeout, Ovh, Api) {
    'use strict';

    $scope.isLogged = false;
    $scope.global = Api;

    function init () {
        $scope.isLogged = Ovh.isLogged();

        Api.getRootApis().then(function (apisList) {
            $scope.apiList = apisList;
        });
    }

    $scope.$on('session.logout', function () {
        $scope.isLogged = Ovh.isLogged();
    });

    // ---

    $scope.toggleRootApi = function (api, $event) {
        api.visible = !api.visible;
        api.viewRAW = false;

        if (api.visible) {

            if (api.subApis) {
                return;
            }

            api.loading = true;
            Api.getSubApis(api.path).then(function (response) {
                api.subApis = response;
                api.loading = false;
            });
        }
    };

    $scope.toggleSubApi = function (subApi, $event) {
        subApi.isOpen = !subApi.isOpen;

        // set focus to first input
        if (subApi.isOpen) {
            $timeout(function () {
                $($event.target).closest('.panel-group').find('.panel-body input[type="text"]:first').focus();
            }, 99);
        }
    };

    $scope.collapseAll = function (api) {
        _.forEach(api.subApis.apis, function (subApi) {
            subApi.isOpen = false;
        });
    };

    $scope.toggleRootApiRAW = function (api) {
        api.visible = true;
        api.viewRAW = !api.viewRAW;
    };

    $scope.requestApi = function (api) {
        api.result = {};
        api.result.showResult = true;
        api.loading = true;
        Api.requestApi(api).then(function (response) {
            api.result.success = true;
            return response;
        }, function (response) {
            api.result.success = false;
            return response;
        }).then(function (response) {
            api.result.data = response.data;
            api.result.status = response.status;
            api.result.statusText = response.statusText;
            api.result.request = response.config;
            api.result.headers = response.headers ? JSON.parse(JSON.stringify(response.headers())) : {};
            api.result.showResult = true;
            api.result.requestTime = response.requestTime;
            api.loading = false;
        });
    };

    $scope.checkUndefined = function (param) {
        if (!param.value) {
            param.value = undefined;
        }
    };

    $scope.addListItem = function(param) {
        console.log("addListItem to", param);
        var itemParams = angular.copy(param);
        itemParams.isList = false;
        itemParams.value = undefined;
        param.value.push(itemParams);
    };

    $scope.delListItem = function(param, index) {
        param.value.splice(index, 1);
    };

    init();

});

