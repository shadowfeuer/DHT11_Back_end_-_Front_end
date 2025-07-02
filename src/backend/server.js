const express = require('express');
const cors = require('cors');
const SensorModule = require('./sensor_module');

const app = express();
const port = 8080;
const sensorModule = new SensorModule();

// Middleware
app.use(cors());
app.use(express.json());

// Démarrer la lecture des capteurs
sensorModule.start();

// APIs pour la température
app.get('/capteurs/temp', (req, res) => { //Envoie la dernière température
    const latestTemp = sensorModule.getLatestTemperature();
    if (latestTemp !== null) {
        res.send(latestTemp.toString());
    } else {
        res.status(404).send('Aucune données de température disponible');
    }
});

app.get('/capteurs/temp/:n', (req, res) => { //Envoie les n dernières températures
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Paramètre invalide');
    }
    
    const history = sensorModule.getTemperatureHistory(n);
    res.json(history);
});

app.get('/capteurs/temp/:n/moy', (req, res) => { //Envoie la moyenne des n données
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Paramètre invalide');
    }
    
    const average = sensorModule.getTemperatureAverage(n);
    if (average !== null) {
        res.send(average.toString());
    } else {
        res.status(404).send('Aucune données de température disponible');
    }
});

// APIs pour l'humidité
app.get('/capteurs/hum', (req, res) => {//Envoie la dernière humidité
    const latestHum = sensorModule.getLatestHumidity();
    if (latestHum !== null) {
        res.send(latestHum.toString() + '%');
    } else {
        res.status(404).send('Aucune données d\'humidité disponible');
    }
});

app.get('/capteurs/hum/:n', (req, res) => {//Envoie les n dernières températures
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Paramètre invalide');
    }
    
    const history = sensorModule.getHumidityHistory(n);
    res.json(history);
});

app.get('/capteurs/hum/:n/moy', (req, res) => {//Envoie la moyenne des n données
    const n = parseInt(req.params.n);
    if (isNaN(n) || n <= 0) {
        return res.status(400).send('Paramètre invalide');
    }
    
    const average = sensorModule.getHumidityAverage(n);
    if (average !== null) {
        res.send(average.toString() + '%');
    } else {
        res.status(404).send('Aucune données d\'humidité disponible');
    }
});

app.listen(port, () => { //Écoute au port sélectionné
    console.log(`Le serveur écoute l\'addresse http://localhost:${port}`);
});
