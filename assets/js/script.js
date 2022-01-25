var keyword = document.querySelector("#keyword");
var btn = document.querySelector("#btn");
var listEl = document.querySelector("#list");
var formEl = document.querySelector("#keyword-form");

var getEvent = function (x) {
  var today = moment().format("YYYY-MM-DD");
  var tomorrow = moment().day(2).format("YYYY-MM-DD");
  var tixApi = "&apikey=xmxhrLJvMZqBKtD916sfNNAvKoMgFHUv";
  var tixParam = "?city=";
  var tixDate =
    "&startDateTime=" +
    today +
    "T00:01:00Z&endDateTime=" +
    tomorrow +
    "T01:00:00Z";
  var tixUrl =
    "https://app.ticketmaster.com/discovery/v2/events.json" +
    tixParam +
    x +
    tixApi +
    tixDate;
  fetch(tixUrl).then(function (response) {
    response.json().then(function (data) {
      listEvents(data);
    });
  });
};

// var getCases = function (x) {
//   var covidUrl =
//     "https://api.covid19api.com/total/country/united-states/status/confirmed?from=2022-01-22T23:00:00Z&to=2022-01-23T00:00:00Z";
//   fetch(covidUrl).then(function (response) {
//     response.json().then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].Province === x) {
//             console.log(data[i])
//         //   return data[i];
//         }
//       }
//     });
//   });
// };

var listEvents = function (data) {
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }
  if (data._embedded === undefined) {
    alert("looks like theres no event going on today through ticketmaster");
  } else {
    for (var i = 0; i < data._embedded.events.length; i++) {
      console.log(data._embedded.events[i].images[0].url);

      var eventInfo = document.createElement("div");

      var eventName = document.createElement("a");
      eventName.textContent = data._embedded.events[i].name;
      eventName.setAttribute("href", data._embedded.events[i].url)
      eventName.setAttribute("target", "_blank")

      var eventPic = document.createElement("img")
      eventPic.setAttribute("src", data._embedded.events[i].images[0].url)
      eventPic.style.height="50px"
      eventPic.style.height="50px"

      var eventTime = document.createElement("div");
      eventTime.textContent = data._embedded.events[i].dates.start.localTime;

      eventInfo.appendChild(eventName)
      eventInfo.appendChild(eventTime)
      eventInfo.appendChild(eventPic)

      listEl.appendChild(eventInfo);
    }
  }
};

var eventFormHandler = function (event) {
  event.preventDefault();

  var key = keyword.value;
  console.log(key);

  if (key) {
    getEvent(key);
    keyword.value = "";
  } else {
    alert("!!!!");
  }
};

formEl.addEventListener("submit", eventFormHandler);
