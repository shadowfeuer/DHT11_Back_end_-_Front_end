var sensorLib = require("node-dht-sensor"); //Ceci est un code pour tester la lecture du DHT11
var express = require('express');

var date_time = new Date();

var app = {
  sensors: [ //tableau de sensors permet une approche modulaire au cas où on veut en rajouter
    {
      name: "Capteur 1",
      type: 11, //11 pour DHT11, 22 pour DHT22
      pin: 17
    }
  ],
  read: function() {
    var readout = sensorLib.read(this.sensors[0].type,this.sensors[0].pin); //si on a plus de capteurs, on peut entourer d'une boucle
    
    console.log(`[${this.sensors[0].name}] ` + date_time + `temperature: ${readout.temperature.toFixed(1)}°C, ` + `humidity: ${readout.humidity.toFixed(1)}%`);
    
    setTimeout(function() {app.read();}, 2000);
  },
    
};

app.read();
  
