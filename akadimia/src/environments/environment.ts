// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appName: "akadimia",
  firebaseConfig: {
    apiKey: "AIzaSyB-KMTTMUv6sqqJxEku22hB6v_jjyQc_zw",
    authDomain: "whoknows-70227.firebaseapp.com",
    databaseURL: "https://whoknows-70227.firebaseio.com",
    projectId: "whoknows-70227",
    storageBucket: "whoknows-70227.appspot.com",
    messagingSenderId: "514597403527",
    appId: "1:514597403527:web:12746e7faacb14e3a9b122"
  },
  hostname : "localhost",
  url_math : 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8080/websocket',
  url_bio : 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8081/websocket',
  url_stt: 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8082/websocket',
  url_eng: 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8083/websocket',
  url_phy: 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8084/websocket',
  url_hindi: 'wss://ec2-18-219-177-105.us-east-2.compute.amazonaws.com:8085/websocket'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
