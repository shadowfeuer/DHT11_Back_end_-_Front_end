var sensorLib = require("node-dht-sensor");

var captor = {
    {
      type: 11,
      pin: 17
    },
  read: getData() {
      var data = sensorLib.read(
        captor.type,
        captor.pin
      );
      console.log(
          `temperature: ${data.temperature.toFixed(1)}°C, ` +
          `humidity: ${data.humidity.toFixed(1)}%`
      );
    }
    setTimeout(getData() {
      captor.read();
    }, 2000);
  }
};

app.read();
