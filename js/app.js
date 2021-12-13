const formSearchCity = document.querySelector(".weather__search-city");
const weatherCard = document.querySelector(".weather__card");
const containerCityName = document.querySelector("[data-js='city-name']");
const containerCityTemperature = document.querySelector(
    "[data-js='city-temperature']"
);
const containerCityRegion = document.querySelector('[data-js="city-region"]');
const containerCityCountry = document.querySelector('[data-js="city-country"]');
const containerCityWeather = document.querySelector('[data-js="city-weather"]');
const containerCityTimestamp = document.querySelector(
    '[data-js="city-timestamp"]'
);
const relativeHumidity = document.querySelector(
    '[data-js="relative-humidity"]'
);
const windSpeedInfo = document.querySelector('[data-js="wind-speed"]');
const pressureInfo = document.querySelector('[data-js="pressure-info"]');
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

    const iconImage = `<img src='./images/src/icons/${WeatherIcon}.svg' />`;
    const hasHideClass = weatherCard.classList.contains("hide");

    if (hasHideClass) weatherCard.classList.remove("hide");

    IsDayTime
        ? (weatherCard.style.backgroundImage = 'url("../images/src/day.svg")')
        : (weatherCard.style.backgroundImage =
              'url("../images/src/night.svg")');

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
