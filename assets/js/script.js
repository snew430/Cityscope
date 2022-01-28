// Document Elements
var city = document.querySelector("#city");
var btn = document.querySelector("#btn");
var tixEl = document.querySelector("#ticketmaster");
var seatEl = document.querySelector("#seatgeek");
var formEl = document.querySelector("#city-form");
var weatherContainer = document.querySelector("#weather");
var cityTitle = document.querySelector("#city-title");

// Today and tomorrow date using Moment()
var today = moment().format("YYYY-MM-DD");
var tomorrow = moment().add(1, "d").format("YYYY-MM-DD");

// ==============GET TICKETMASTER INFO===========
var getTix = function (x) {
  var tixParam = "?city=";
  var tixApi = "&apikey=xmxhrLJvMZqBKtD916sfNNAvKoMgFHUv";
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
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        listTix(data);
      });
    } else {
      alert("Sorry, Events could not be found");
    }
  });
};
// ==================================================

// ====================Get Weather ==================

var getWeather = function (location) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&units=imperial&appid=8a42d43f7d7dc180da5b1e51890e67dc";

  fetch(weatherUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayWeather(data);
      });
    } else {
      alert("Sorry, Weather could not be found");
    }
  });
};
// ==================================================

// ====================Get BandsInTown ==================

function bands() {
  var bandsUrl =
    "https://rest.bandsintown.com/artists/ween/events/?app_id=9fd37fb85706620acc6620c7fe4040e8";
  fetch(bandsUrl).then(function (response) {
    response.json().then(function (data) {
      // console.log(data);
    });
  });
}
// ==================================================

// =================Get SeatGeek Events ================

function getSeat(location) {
  var clientId = "MjU0ODQxMjJ8MTY0MzE1NTg1NC4wMjk3OTk";
  var seatUrl =
    "https://api.seatgeek.com/2/events?venue.city=" +
    location +
    "&client_id=" +
    clientId;
  fetch(seatUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      listSeat(data);
    });
  });
}
// ==================================================

// ==========List TicketMaster Events===========

var listTix = function (data) {
  console.log(data);
  while (tixEl.firstChild) {
    tixEl.removeChild(tixEl.firstChild);
  }
  if (data._embedded === undefined) {
    alert("looks like theres no event going on today through ticketmaster");
  } else {
    for (var i = 0; i < data._embedded.events.length; i++) {
      // Create Divs for Cards
      let tixRow = document.createElement("div");
      tixRow.classList = "row";

      let tixCol = document.createElement("div");
      tixCol.classList = "col s6 m17";

      let tixCard = document.createElement("div");
      tixCard.classList = "card small";

      let tixCardImage = document.createElement("div");
      tixCardImage.classList = "card-image";

      // Get Card Image
      let tixImage = document.createElement("img");
      tixImage.setAttribute("src", data._embedded.events[i].images[0].url);

      // Get Time of event
      let tixCardImageText = document.createElement("span");
      tixCardImageText.classList = "card-title";
      let amPM = parseInt(data._embedded.events[i].dates.start.localTime.slice(0, 2));
      let end;
      if (amPM > 12) {
        amPM = amPM - 12;
        end = "PM";
      } else {
        end = "AM";
      }
      if (amPM === 0) {
        amPM = 12;
      }
      tixCardImageText.textContent = amPM + data._embedded.events[i].dates.start.localTime.slice(2, 5) + end;

      // Append both card image and time
      tixCardImage.appendChild(tixImage);
      tixCardImage.appendChild(tixCardImageText);

      // Get event name
      let tixCardContent = document.createElement("div");
      tixCardContent.classList = "card-content";
      let tixCardContentP = document.createElement("p");
      tixCardContentP.textContent = data._embedded.events[i].name;

      tixCardContent.appendChild(tixCardContentP);

      // Get link for event
      let tixCardAction = document.createElement("div");
      tixCardAction.classList = "card-action";
      let tixCardActionA = document.createElement("a");
      tixCardActionA.textContent = "Click here for ticket info";
      tixCardActionA.setAttribute("href", data._embedded.events[i].url);
      tixCardActionA.setAttribute("target", "_blank");

      tixCardAction.appendChild(tixCardActionA);

      // Append the card together
      tixCard.appendChild(tixCardImage);
      tixCard.appendChild(tixCardContent);
      tixCard.appendChild(tixCardAction);

      tixCol.appendChild(tixCard);
      tixRow.appendChild(tixCol);

      tixEl.appendChild(tixRow);
    }
  }
};
// ==============================================

// =============Get SEATGEEK Info=================

var listSeat = function (data) {
  while (seatEl.firstChild) {
    seatEl.removeChild(seatEl.firstChild);
  }
  for (var i = 0; i < 10; i++) {
    var wrapper = document.createElement("div");
    if (i % 2 === 0) {
      wrapper.className = "seatEven";
    } else {
      wrapper.className = "seatOdd";
    }
    var eventName = document.createElement("a");
    eventName.textContent = data.events[i].title;
    eventName.setAttribute("href", data.events[i].url);
    eventName.setAttribute("target", "_blank");

    var venue = document.createElement("div");
    venue.textContent = data.events[i].venue.name;

    var eventTime = document.createElement("div");
    eventTime.textContent = moment(data.events[i].datetime_local).format(
      "h:mm a"
    );

    if (data.events[i].stats.lowest_price) {
      var priceRange = document.createElement("div");
      var minPrice = data.events[i].stats.lowest_price;
      var maxPrice = data.events[i].stats.highest_price;
      priceRange.textContent = "Price: $" + minPrice + "- $" + maxPrice;
    }

    wrapper.appendChild(eventName);
    wrapper.appendChild(venue);
    wrapper.appendChild(eventTime);
    if (priceRange) {
      wrapper.appendChild(priceRange);
    }
    seatEl.appendChild(wrapper);
  }
};
// ==================================================

// ========Which Weather Icon to Use==============
var weatherIcon = function (id) {
  // List which icons to use

  var icon;
  var thunderstorm = "<i class='bi bi-cloud-lightning-rain'></i>";
  var drizzle = "<i class='bi bi-cloud-drizzle'></i>";
  var rain = "<i class='bi bi-cloud-rain'></i>";
  var snow = "<i class='bi bi-snow'></i>";
  var haze = "<i class='bi bi-cloud-haze'></i>";
  var clear = "<i class='bi bi-moon-stars'></i>";
  var clear = "<i class='bi bi-brightness-high'></i>";
  var cloud = "<i class='bi bi-cloud-moon'></i>";
  var cloud = "<i class='bi bi-cloud-sun'></i>";
  var cloudy = "<i class='bi bi-cloud'></i>";

  //   Assign the icon depending on the weather id
  if (id >= 200 && id < 300) {
    icon = thunderstorm;
  } else if (id >= 300 && id < 400) {
    icon = drizzle;
  } else if ((id >= 500 && id <= 504) || (id >= 520 && id < 600)) {
    icon = rain;
  } else if (id === 511) {
    icon = snow;
  } else if (id >= 600 && id < 700) {
    icon = snow;
  } else if (id >= 700 && id < 800) {
    icon = haze;
  } else if (id === 800) {
    icon = clear;
  } else if (id === 801) {
    icon = cloud;
  } else if (id >= 802) {
    icon = cloudy;
  }
  return icon;
};
// ==================================================

// ===============DISPLAY WEATHER================
var displayWeather = function (weather) {
  // let weatherEl = document.createElement("div");
  var temp = weather.main.temp;
  var icon = weatherIcon(weather.weather[0].id);
  // weatherEl.textContent = temp;
  weatherContainer.textContent = temp;
};
// ==================================================

// =================Get Info From Form Input===========
var eventFormHandler = function (event) {
  event.preventDefault();

  loader(tixEl)
  loader(seatEl)

  var location = city.value;

  if (location) {
    cityTitle.textContent = location.toUpperCase();
    getTix(location);
    getWeather(location);
    getSeat(location);
    city.value = "";
  } else {
    alert("!!!!");
  }
};
// ==================================================

// ===================LOADER=======================

function loader(appendWhere){

  let preloader =document.createElement("div")
  preloader.classList ="preloader-wrapper big active"

  let spinner= document.createElement("div")
  spinner.classList = "spinner-layer spinner-blue-only"

  let circleClipperLeft =document.createElement("div")
  circleClipperLeft.classList="circle-clipper left"

  let gap = document.createElement("div")
  gap.classList="gap-patch"

  let circleClipperRight =document.createElement("div")
  circleClipperRight.classList="circle-clipper right"

  let circle = document.createElement("div")
  circle.classList="circle"

  circleClipperLeft.appendChild(circle)
  gap.appendChild(circle)
  circleClipperRight.appendChild(circle)

  spinner.appendChild(circleClipperLeft)
  spinner.appendChild(gap)
  spinner.appendChild(circleClipperRight)

  preloader.appendChild(spinner)

  appendWhere.appendChild(preloader)

}

formEl.addEventListener("submit", eventFormHandler);
