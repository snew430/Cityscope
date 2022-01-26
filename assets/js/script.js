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
      console.log(data)
    });
  });
};
getEvent("new york");
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
  console.log(data._embedded);
  // for (var i = 0; i < data._embedded.events.length; i++) {
  //   var li = document.createElement("div");
  //   li.textContent = data._embedded.events[i].name
  //   listEl.appendChild(li);
  // }
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
var clientId =  "MjU0ODQxMjJ8MTY0MzE1NTg1NC4wMjk3OTk"
var secret = "19613d779daf9ddb91c3d61527dea8a2db95015a8f78e369a9bb7ab684828a1e"

function seatGeek(){
var seatUrl = "https://api.seatgeek.com/2/events?client_id=" + clientId + "&lat=40.7143" + "&lon=-74.006" 
fetch(seatUrl).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  })
})
}
seatGeek();

function bands(){
var bandsUrl = "https://rest.bandsintown.com/artists/ween/events/?app_id=9fd37fb85706620acc6620c7fe4040e8"
fetch(bandsUrl).then(function (response) {
  response.json().then(function(data){
    console.log(data[2]);
  })
})
}
bands();
