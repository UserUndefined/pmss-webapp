(function () {

    'use strict';

    angular
        .module('myApp')
        .service('authService', authService);

    authService.$inject = ['jwtHelper'];

    function authService(jwtHelper) {

        function login(callback) {
            console.log('login called');
            AWS.config.region = 'eu-west-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-1:e2856010-0134-4939-ba92-d9e47664ecd4',
                Logins: {
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_5bqrTpsa6': JSON.parse(localStorage.getItem('token'))
                }
            });
            AWSCognito.config.region = 'eu-west-1';
            AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'eu-west-1_5bqrTpsa6'
            });
            // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
            AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
                UserPoolId: 'eu-west-1_5bqrTpsa6',
                ClientId: '4s8rus58fmkod8hqbgtqndpvvp'
            });

            var authenticationData = {
                Username: 'cristov2',
                Password: 'Y7l7d@xL'
            };
            var userData = {
                Username: 'cristov2',
                Pool: userPool
            };
            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    localStorage.setItem('token', JSON.stringify(result.idToken.jwtToken));
                    window.location = '#/';
                    return callback(null);
                },
                onFailure: function (err) {
                    console.log(err);
                    return callback(err);
                }
            });
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout(callback) {
            console.log('logout called');
            localStorage.removeItem('token');
            return callback(null);
        }

        function hasValidToken() {
            var userToken = localStorage.getItem('token');
            if (!userToken) {
                return false;
            } else {
                return !jwtHelper.isTokenExpired(userToken);
            }
        }

        function getToken() {
            return localStorage.getItem('token');
        }

        function getCredentials() {
            if(hasValidToken){
                var token = localStorage.getItem('token');
                var tokenPayload = jwtHelper.decodeToken(token);
                return {
                    userName: tokenPayload.user,
                    email: tokenPayload.email
                };
            } else {
                return {
                    userName: '',
                    email: ''
                };
            }
        }

        return {
            login: login,
            logout: logout,
            hasValidToken: hasValidToken,
            getCredentials: getCredentials,
            getToken: getToken
        }
    }
})();
