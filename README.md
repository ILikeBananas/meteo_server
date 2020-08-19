# Serveur météo
## Utilisation par nodejs directement
### Prérequis
- NodeJS
- NPM
- Accès réseau suffisant pour installer des paquets NPM (Pas le réseau divtec par exemple)

### Installation
1. Télécharger le projet sur GitHub
2. Extraire tout le dossier (si téléchargé en .zip)

```
cd meteo_server
npm install
```

### Démarrage
````
cd meteo_server
npm start
````

### Utilisation
Ouvrez votre nagivateur web et naviguer sur la page `` localhost:8081 ``

### Page admin
La page admin n'est pas encore sécurisée mais permet déjà de renommer des arduinos et de les supprimer. Pour accéder a cette page, naviguer sur la page ``localhost:8081/admin``.

## Utilisation par docker
### Prérequis
- Docker à jour et installé

### Installation simple
```
docker pull ilikebananas/meteo_server
```

### Build le docker depuis les sources
1. Télécharger le projet sur GitHub
2. Extraire tout le dossier (si téléchargé en .zip)

```
docker build -t meteo_server .
```
### Démarrage
```
docker run ilikebananas/meteo_server -p <port>:8081
```
<port> correspond au port que vous souhaitez que le server écoute sur la machine physique  
Vous pouvez ajouter un nom au contenaire en ajoutant le paramètre ```-- names meteo_server ```
## API
### Mettre à jour les données d'un arduino
```
/API/setState/{id}/{température}/{humidité}
```
Change les données du arduino _"identifiant"_ pour y affecter sa _température_ et son _humidité_

### Recevoir toutes les valeurs
````
/API/getAllValues
````
Renvoie un JSON qui contient les données de tous les arduinos connectés

### Changer le nom d'un arduino
````
/API/setName/{id}/{name}
````
Change le nom de l'arduino avec l'_id_ donné

### Suppression d'un arduino
````
/API/remove/{id}
````
Supprime l'arduino avec l'_id_ donné
