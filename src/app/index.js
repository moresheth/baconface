import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const date = document.getElementById("date");
const time = document.getElementById("time");
const hr = document.getElementById("hr");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

hr.text = "--";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let dayName = days[ today.getDay() ];
  let monthName = months[ today.getMonth() ];
  let dayNumber = today.getDate();
  date.text = `${dayName}, ${monthName} ${dayNumber}`;

  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  time.text = `${hours}:${mins}`;
}

var hrm = new HeartRateSensor();

hrm.onreading = function() {
  if ( hrm.heartRate ) hr.text = hrm.heartRate;
}

hrm.start();
