const formSearchCity = document.querySelector(".weather__search-city");
const weatherCard = document.querySelector(".weather__card");
const weatherCardImage = document.querySelector(".weather__card-image img");
const containerCityName = document.querySelector("[data-js='city-name']");
const containerCityRegion = document.querySelector('[data-js="city-region"]');
const containerCityCountry = document.querySelector('[data-js="city-country"]');
const containerCityWeather = document.querySelector('[data-js="city-weather"]');
const containerCityTimestamp = document.querySelector(
    '[data-js="city-timestamp"]'
);
const containerCityTemperature = document.querySelector(
    "[data-js='city-temperature']"
);
const pressureInfo = document.querySelector('[data-js="pressure-info"]');
const relativeHumidity = document.querySelector(
    '[data-js="relative-humidity"]'
);
const windSpeedInfo = document.querySelector('[data-js="wind-speed"]');
let timeIcon = document.querySelector('[data-js="time-icon"]');

// const insertInfoIntoDOM = () => {};

formSearchCity.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputValue = event.target.searchCity.value;

    const [{ Key, LocalizedName, AdministrativeArea, Country }] =
        await getCityData(inputValue);
    const [
        {
            WeatherText,
            Temperature,
            IsDayTime,
            EpochTime,
            RelativeHumidity,
            Wind,
            Pressure,
            WeatherIcon,
        },
    ] = await getWeatherData(Key);

    const iconImage = `<img src='images/src/icons/${WeatherIcon}.svg' />`;
    const hasHideClass = weatherCard.classList.contains("hide");

    if (hasHideClass) weatherCard.classList.remove("hide");

    IsDayTime
        ? (weatherCardImage.src = "images/src/day.svg")
        : (weatherCardImage.src = "images/src/night.svg");

    containerCityName.textContent = LocalizedName;
    containerCityTemperature.textContent = Temperature.Metric.Value;
    containerCityRegion.textContent = AdministrativeArea.EnglishName;
    containerCityCountry.textContent = Country.EnglishName;
    containerCityWeather.textContent = WeatherText;
    containerCityTimestamp.textContent = formatTimestamp(EpochTime);
    relativeHumidity.textContent = RelativeHumidity;
    windSpeedInfo.textContent = Wind.Speed.Metric.Value;
    pressureInfo.textContent = Pressure.Metric.Value;
    timeIcon.innerHTML = iconImage;

    formSearchCity.reset();
});
