import { display } from "display";
import { Accelerometer } from "accelerometer";
import document from "document";
//import { me } from "appkit";

import { HeartRateSensor } from "heart-rate";
import { geolocation } from "geolocation";
import * as messaging from "messaging";

console.log("App Started");

display.autoOff = false;
display.on = true;
var latitude = 0;
var longtitude = 0;

let accelData = document.getElementById("accel-data");
let hrmData = document.getElementById("hrm-data");
let geoData = document.getElementById("geo-data");

let accel = new Accelerometer();
let hrm = new HeartRateSensor();
var geo = geolocation.watchPosition(locationSuccess, locationError);
let heartRateGV = 0;
accel.start();
hrm.start();

hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  heartRateGV = hrm.heartRate;
  //lastValueTimestamp = Date.now();
}

function refreshData() {
  console.log(hrm.heartRate);
  let data = {
    accel: {
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    },
    hrm: {
      heartRate: heartRateGV ? heartRateGV : 0
    },
    geo: {
      latitude: latitude,
      longtitude: longtitude
    }
  };
  // Peek the current sensor values
  console.log("time:" + accel.timestamp,
              "x:" + accel.x,
              "y:" + accel.y,
              "z:" + accel.z);
  if (accel.z > 4.0){
    console.log("time:", accel.timestamp,
                "ALERT:", "Falling");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          //Send object as JSON string to companion
          data = "ALERT: Falling.";
          messaging.peerSocket.send(JSON.stringify(data));
      }
  }
  console.log("heart rate: " +  hrm.heartRate)
  if (hrm.heartRate < 55 || hrm.heartRate > 110){
    console.log("time:" + accel.timestamp,
                "ALERT: Abnormal heart rate.");
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
          //Send object as JSON string to companion
          data = "ALERT: Abnormal heart rate.";
          messaging.peerSocket.send(JSON.stringify(data));
      }
  }
  
  accelData.text = JSON.stringify(data.accel);
  hrmData.text = JSON.stringify(data.hrm);
  geoData.text = JSON.stringify(data.geo);
}

function locationSuccess(position) {
 
   console.log("Latitude: " + position.coords.latitude,
               "Longitude: " + position.coords.longitude);
   latitude = position.coords.latitude;
   longtitude = position.coords.longitude;
}

function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}

//When companion sends a message
messaging.peerSocket.onmessage = evt => {
  //Write to the display
  var display = document.getElementById("response");
  display.text = evt.data;
}
  
refreshData();
setInterval(refreshData, 1000);