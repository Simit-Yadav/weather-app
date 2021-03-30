window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDesc = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  console.log(temperatureDesc);
  let icon = document.getElementById("icon");
  console.log(icon);
  let temperatureSection = document.querySelector(".degree-section");
  let tempSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const key = "368f8b9aabddae7f381d86494f8cce56";
      const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

      fetch(weatherApi, {
        method: "GET",
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { main } = data.weather[0];
          const code = data.cod;
          console.log(temp, main, code);

          temperatureDegree.textContent = temp;
          temperatureDesc.textContent = main;
          locationTimezone.textContent = data.sys.country + "/" + data.name;

          icon.className = `owf owf-${code} owf-5x`;
          console.log(icon);

          let celcius = Math.floor((temp - 32) * (5 / 9));

          temperatureSection.addEventListener("click", () => {
            if (tempSpan.textContent == "F") {
              tempSpan.textContent = "C";
              temperatureDegree.textContent = celcius;
            } else {
              tempSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
