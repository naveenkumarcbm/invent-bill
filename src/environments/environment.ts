// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCicNlnQLmK46xksWHhxlDmIiE8qYIrGe4",
    authDomain: "inventbill.firebaseapp.com",
    databaseURL: "https://inventbill.firebaseio.com",
    projectId: "inventbill",
    storageBucket: "inventbill.appspot.com",
    messagingSenderId: "286529859632",
    appId: "1:286529859632:web:01a3cc07eba881751b3df5",
    measurementId: "G-5DPZJG9J5B"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
