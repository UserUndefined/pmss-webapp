(function () {

    'use strict';

    angular
        .module('myApp')
        .service('dbAccessService', dbAccessService);

    dbAccessService.$inject = [];

    function dbAccessService() {

        function getNames(callback) {
            AWS.config.region = 'eu-west-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-1:e2856010-0134-4939-ba92-d9e47664ecd4',
                Logins: {
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_5bqrTpsa6': JSON.parse(localStorage.getItem('token'))
                }
            });

            AWS.config.credentials.get(function (err) {
                var client = apigClientFactory.newClient({
                    accessKey: AWS.config.credentials.accessKeyId,
                    secretKey: AWS.config.credentials.secretAccessKey,
                    sessionToken: AWS.config.credentials.sessionToken,
                    region: 'eu-west-1'
                });
                client.getnamesGet().then(function (data) {
                    return callback(null, data);
                });
            });
        }

        return {getNames: getNames};
    }
})();
