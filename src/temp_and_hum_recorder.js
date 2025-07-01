var sensorLib = require("node-dht-sensor");
var express = require('express');

var date_time = new Date();

var app = {
  sensors: [
    {
      name: "Capteur 1",
      type: 11,
      pin: 17
    }
  ],
  read: function() {
    var readout = sensorLib.read(this.sensors[0].type,this.sensors[0].pin);
    
    console.log(`[${this.sensors[0].name}] ` + date_time + `temperature: ${readout.temperature.toFixed(1)}°C, ` + `humidity: ${readout.humidity.toFixed(1)}%`);
    
    setTimeout(function() {app.read();}, 2000);
  },
  write: function() {
    app.read();
  }
    
};

app.write();
  
