export const AppSettings = {
  appTitle: 'PMSS Web App',
  apiUrl: 'https://dkuj6wfe4j.execute-api.eu-west-1.amazonaws.com/dev/developments',
  USER_ROLES: {
    all: '*',
    admin: 'admin'
  },
  IDENTITY: {
    userPoolId: 'eu-west-1_5MHtkIKtT',
    identityPoolId: '2d9fbafa-4753-41d8-8353-8b2f44675cf4',
    clientId: '2mg368usdh6ql5463cqtoratfp',
    awsRegion: 'eu-west-1'
  },
  AUTH_EVENTS: {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    logoutRequest: 'auth-logout-request',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  },
  APP_EVENTS: {
    completeDevelopmentFilter: 'completeDevelopmentFilter'
  }
};

export default AppSettings;
