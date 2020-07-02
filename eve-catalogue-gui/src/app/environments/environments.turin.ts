// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
​
export const environment = {
  production: false,
  dcsBaseUrl: 'http://10.50.80.15:8080/portal/dcs/dashboard/',
  portalBaseUrl: 'http://10.50.80.18:8082/portal/catalogue/',
  lcmBaseUrl: 'http://10.50.80.18:8084/portal/elm/',
  rbacBaseUrl: 'http://10.50.80.13:8090/portal/rbac/',
  iwlBaseUrl: 'http://10.50.80.10:8083/',
  tsbBaseUrl: 'http://10.5.7.11:9090/portal/tsb/',
  ibnBaseUrl: 'http://10.50.80.36:8080/Intent/IntentPage.jsp',
  apiUrl: 'http://10.50.80.18',
    fsBaseUrl: 'http://10.50.80.13:9191/portal/fs/',
    formulaCheckUrl: 'http://10.50.80.18:8989/check',
  backServerUrl: ''
};
​
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
