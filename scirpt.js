const apiKey="10133dc1d1c7d7266fd5d0026063a608";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const weatherImages = {
    "Clouds": "images/clouds.png",
    "Clear": "images/clear.png",
    "Rain": "images/rain.png",
    "Drizzle": "images/drizzle.png",
    "Mist": "images/mist.png",
    "Snow": "images/snow.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weather = data.weather[0].main;

        const weatherIconSrc = weatherImages[weather] || "default.png";
        document.querySelector(".weather-icon").src = weatherIconSrc;
        document.querySelector(".weather-icon").style.marginTop= "10px";
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Weather data could not be fetched:", error);
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display= "block";
    } 
}

document.addEventListener("DOMContentLoaded", function() {

    const searchBtn = document.querySelector(".search button");
    const searchBox = document.querySelector(".search input");
    const error = document.querySelector(".error");

    searchBtn.addEventListener("click", () => {
        if (searchBox.value.trim() !== "") {
            checkWeather(searchBox.value);
            error.style.display = "none";
        }else{
            error.style.display = "none";
            document.querySelector(".weather").style.display = "none";
        }
    });

}); 