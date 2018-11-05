// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY_HERE',
    authDomain: 'itnext-summit-2018.firebaseapp.com',
    databaseURL: 'https://itnext-summit-2018.firebaseio.com',
    projectId: 'itnext-summit-2018',
    storageBucket: 'itnext-summit-2018.appspot.com',
    messagingSenderId: 'YOUR_GCM_MESSAGE_SENDER_ID_HERE'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
