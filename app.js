const destination = [
  {
    name: "CN Tower",
    image: "cn-tower.jpg",
    min: 20.5,
  },
  {
    name: "Bluffer's Park",
    address: "Ontario",
    image: "bluffers-park.jpg",
    min: 20.5,
  },
  {
    name: "Royal Ontario Museum",
    image: "royal-ontario-museum.jpg",
    min: 20.5,
  },
  {
    name: "Art Gallery",
    image: "art-gallery.jpg",
    min: 20,
  },
  {
    name: "Casa Loma",
    image: "casa-loma.jpg",
    min: 16,
  },
  {
    name: "Ripley's Aquarium",
    image: "ripleys-aquarium.jpg",
    min: 22,
  },
  {
    name: "Toronto Zoo",
    image: "toronto-zoo.jpg",
    min: 25,
  },
];

window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDegree = document.querySelector(".temperature-degree");
  let icon = document.getElementById("temperature-icon");
  let places = document.querySelector(".places");
  console.log(temperatureDegree, icon, places);

  let temperatureSection = document.querySelector(".weather__temperature");
  let tempSpan = document.querySelector(".weather__temperature span");
  console.log(temperatureSection, tempSpan);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const key = "368f8b9aabddae7f381d86494f8cce56";
      const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

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
          // temperatureDesc.textContent = main;

          icon.className = `owf owf-${code} owf-5x`;
          console.log(icon);

          let celcius = Math.floor((temp - 32) * (5 / 9));

          let toTravel = [];
          console.log(destination);
          for (let i = 0; i < destination.length; i++) {
            if (celcius >= destination[i].min) {
              toTravel.push(destination[i]);
            }
          }
          console.log(toTravel);

          toTravel.forEach((place) => {
            let div = document.createElement("div");
            div.classList.add("place");

            let template = `
          <div class="place__image">
            <img src="/images/${place.image}" alt="" />
          </div>
          <div class="place__name">
            <h1><i class="fas fa-map-marker-alt"></i>${place.name}</h1>
          </div>
          <div class="place__address">
            <p>
              ${place.address}
            </p>
          </div>`;
            div.innerHTML = template;
            places.appendChild(div);
          });

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
