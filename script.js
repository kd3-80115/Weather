const openWeatherMaqUrl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "f0aa9556e1a5275968b3fe0918101d8e"; //myKey

let helper = new XMLHttpRequest();

function getWeather() {
  let cityName = "";

  let refToCname = document.getElementById("cname");
  let refToWeather = document.getElementById("weather");
  let refToDesc = document.getElementById("description");
  let refToTemp = document.getElementById("temperature");
  let reftoWeatherIcon = document.getElementById("weather-icon");
  let refToLoader = document.getElementById("loader");

  let refToSearchCity = document.getElementById("search-city");


  cityName=refToSearchCity.value;
  let refToWarning = document.getElementById("not-found");

  refToLoader.style.display="block";//It will start the loading gif till the data is being found
  helper.onreadystatechange = () => {
    console.log(helper.readyState);
    if (helper.readyState == 4) {
        if (helper.status == 200) {
            let st = helper.responseText;
            let obj = JSON.parse(st);
            if (obj.cod == 200) {
                refToCname.innerText = `${obj.name}`;
                refToWeather.innerText = obj.weather[0].main;
                refToDesc.innerText = obj.weather[0].description;
                refToTemp.innerText = obj.main.temp;
                reftoWeatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png" alt="Weather Icon"></img>`;
                refToWarning.innerText = "";
                refToLoader.style.display="none";
            } 
        } else {
            // Handle bad request error, e.g., set inner text of refToWarning
            refToWarning.innerText = "City Not Found";
            refToLoader.style.display="none";
        }
    }
    
  };

  helper.open(
    "GET",
    `${openWeatherMaqUrl}?q=${cityName}&appid=${apikey}&units=metric`
  );
  helper.send();
}
