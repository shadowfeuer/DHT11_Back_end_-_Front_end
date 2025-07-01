var sensorLib = require("node-dht-sensor");
//var express = require('express');

var date_time = new Date();

var app = {
  sensors: [
    {
      name: "Indoor",
      type: 11,
      pin: 17
    }
  ],
  read: function() {
    for (var sensor in this.sensors) {
      var readout = sensorLib.read(
        this.sensors[sensor].type,
        this.sensors[sensor].pin
      );
      console.log(
        `[${this.sensors[sensor].name}] ` + /*date_time +*/
          `temperature: ${readout.temperature.toFixed(1)}°C, ` +
          `humidity: ${readout.humidity.toFixed(1)}%`
      );
    }
    setTimeout(function() {
      app.read();
    }, 2000);
  }
};

app.read();
  
