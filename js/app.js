const formSearchCity = document.querySelector(".weather__search-city");
const weatherCard = document.querySelector(".weather__card");
const weatherCardImage = document.querySelector(".weather__card-image img");
const cityName = document.querySelector("[data-js='city-name']");
const cityRegion = document.querySelector('[data-js="city-region"]');
const cityCountry = document.querySelector('[data-js="city-country"]');
const cityWeather = document.querySelector('[data-js="city-weather"]');
const cityTimestamp = document.querySelector('[data-js="city-timestamp"]');
const cityTemperature = document.querySelector("[data-js='city-temperature']");
const pressure = document.querySelector('[data-js="pressure-info"]');
const humidity = document.querySelector('[data-js="relative-humidity"]');
const windSpeed = document.querySelector('[data-js="wind-speed"]');
let weatherIcon = document.querySelector('[data-js="time-icon"]');

const getImageIcon = (WeatherIcon) =>
    `<img src='images/src/icons/${WeatherIcon}.svg' />`;

const showCardWeather = () => {
    const hasHideClass = weatherCard.classList.contains("hide");

    if (hasHideClass) weatherCard.classList.remove("hide");
};

const showCityWeatherInfo = async (city) => {
    const [{ Key, LocalizedName, AdministrativeArea, Country }] =
        await getCityData(city);
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

    weatherCardImage.src = IsDayTime
        ? "images/src/day.svg"
        : "images/src/night.svg";
    cityName.textContent = LocalizedName;
    cityRegion.textContent = AdministrativeArea.EnglishName;
    cityCountry.textContent = Country.EnglishName;
    cityTimestamp.textContent = formatTimestamp(EpochTime);
    weatherIcon.innerHTML = getImageIcon(WeatherIcon);
    cityWeather.textContent = WeatherText;
    cityTemperature.textContent = Temperature.Metric.Value;
    pressure.textContent = Pressure.Metric.Value;
    humidity.textContent = RelativeHumidity;
    windSpeed.textContent = Wind.Speed.Metric.Value;
};

const showDataIntoDOM = (event) => {
    event.preventDefault();

    const inputValue = event.target.searchCity.value;

    showCardWeather();
    showCityWeatherInfo(inputValue);

    formSearchCity.reset();
};

formSearchCity.addEventListener("submit", showDataIntoDOM);
