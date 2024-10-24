# AngularPWA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Add PWA to angular project

ng add @angular/pwa

This will install all necessary dependencies including manifest and ngsw-config files

## To run localy (using Visual Studio Code)

1) npm i -g http-server (if did not before)
2) npm run build
3) dist folder / right click on app name / choose 'Open in integrated Terminal'
4) http-server -o

## Make PWA run with windows start (Chrome example)

1) in address line: chome://apps
2) right click on app icon
3) select 'Launch at startup'

## Apply app update

Make sure that Angular Service Worker provided in project
In app.config.ts:

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
    enabled: environment.production,
    registrationStrategy: 'registerWhenStable:30000'
  })]
};


### Auto


