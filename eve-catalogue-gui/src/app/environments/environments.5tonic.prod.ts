
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
​
export const environment = {
  production: false,
    portalBaseUrl: 'https://portal.5g-eve.eu/portal/catalogue/',
    lcmBaseUrl: 'https://portal.5g-eve.eu/portal/elm/',
    rbacBaseUrl: 'https://portal.5g-eve.eu/portal/rbac/',
    iwlBaseUrl: 'https://portal.5g-eve.eu/iwl/cat/',
    tsbBaseUrl: 'https://portal.5g-eve.eu/portal/tsb/',
    ibnBaseUrl: 'https://portal.5g-eve.eu/ibn/Intent/IntentPage.jsp',
    apiUrl: 'https://portal.5g-eve.eu/',
    dcsBaseUrl: 'https://portal.5g-eve.eu/portal/dcs/dashboard/',
    fsBaseUrl: 'https://portal.5g-eve.eu/portal/fs/',
    formulaCheckUrl: 'https://portal.5g-eve.eu/portal/formula/check',
    backServerUrl: '',
    supportBaseUrl: 'http://10.5.7.20:8086/', //to be mapped in the nginx
    iwfUrl: 'http://172.17.73.101:8087/'      //to be mapped in the nginx
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
