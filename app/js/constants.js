export const AppSettings = {
  appTitle: 'PMSS Web App',
  apiUrl: '/api/v1',
  USER_ROLES: {
    all: '*',
    admin: 'admin'
  },
  AUTH_EVENTS: {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  }
};

export default AppSettings;
