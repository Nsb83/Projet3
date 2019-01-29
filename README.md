# AUTOSTOP-FRANCE
Projet réalisé de décembre 2018 à janvier 2019 à la Wild Code School de Lyon pour M. Cointet Éric et autostop-france.


## Technos utilisées :
+ [Java 8](https://docs.oracle.com/javase/8/docs/api/) (SpringBoot, Security, Maven)
+ [Ionic 3](https://ionicframework.com/docs/v3/) (Cordova)
+ [@ionic-native-google-maps](https://github.com/ionic-team/ionic-native-google-maps)
+ [Java Client for Google Maps Services
](https://github.com/googlemaps/google-maps-services-java)

## Getting Started

### Prérequis
+ [nodejs + npm](https://nodejs.org/en/)
+ [ionic 3](https://ionicframework.com/docs/v3/intro/installation/)
+ [Maven](https://maven.apache.org/)
+ [Java JDK](https://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)

### Installation
Cloner le projet :
```
git clone [URL_GIT_PROJECT]
```

Pour lancer le serveur :

```
cd project-autostop/back
mvn spring-boot:run
```

Pour ajouter la carte dans le projet ionic :
```
ionic cordova plugin add cordova-plugin-googlemaps \
  --variable API_KEY_FOR_ANDROID="[YOUR_GOOGLE_API-KEY]" \
  --variable API_KEY_FOR_IOS="[YOUR_GOOGLE_API-KEY]"
```

Pour lancer l'application ionic dans le navigateur par défaut :

```
cd project-autostop/Front/autostop
npm install
ionic cordova run browser
```

## Équipe de développement :
[Shems Chelgoui](https://github.com/F4CTE), [Zakaria Hamichi](https://github.com/ZakariaHamichi), [Nicolas Barbier](https://github.com/Nsb83), [Alexandre Guérin](https://github.com/Ithrandil), [Jean-Noël Bourrat](https://github.com/JNBourrat)
