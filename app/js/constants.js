export const AppSettings = {
  appTitle: 'PMSS Web App',
  apiUrl: 'https://rcpirn9bwd.execute-api.eu-west-1.amazonaws.com/prod',
  USER_ROLES: {
    all: '*',
    admin: 'admin'
  },
  IDENTITY: {
    poolId: 'eu-west-1_5MHtkIKtT',
    clientId: '2mg368usdh6ql5463cqtoratfp',
    awsRegion: 'eu-west-1'
  },
  AUTH_EVENTS: {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  },
  APP_EVENTS: {
    completeDevelopmentFilter: 'completeDevelopmentFilter'
  }
};

export default AppSettings;
