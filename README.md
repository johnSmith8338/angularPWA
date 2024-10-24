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
![image alt](https://github.com/johnSmith8338/angularPWA/blob/397831c882377b9be91224fc2127b1f248495114/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20193803.png)

Simple environment files
![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20193930.png?raw=true)

![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20193948.png?raw=true)

angular.json
![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20215304.png?raw=true)

#### In component
![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20214309.png?raw=true)

Auto update
![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20214432.png?raw=true)

Manual update
![image alt](https://github.com/johnSmith8338/angularPWA/blob/main/src/assets/img/screenshots/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202024-10-24%20214450.png?raw=true)
