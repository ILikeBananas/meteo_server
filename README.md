# Serveur météo
## Prérequis
- NodeJS
- NPM
- Accès réseau suffisant pour installer des paquets NPM (Pas le réseau divtec par exemple)

## Installation
```
cd meteo_server
npm install
```

## Démarrage
````
cd meteo_server
npm start
````

## API
### Mettre à jour les données d'un arduino
```
/API/{id}/{température}/{humidité}
```
Change les données du arduino _"identifiant"_ pour y affecter sa _température_ et son _humidité_


### Recevoir toutes les valeurs
````
/API/getAllValues
````
Renvoie un JSON qui contient les données de tous les arduinos connectés
