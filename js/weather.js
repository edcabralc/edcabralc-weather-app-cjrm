const apiKey = "r0IQGnWGAYNnbWtkdSpDUW1deyisMtip";
const baseUrl = "https://dataservice.accuweather.com/";

const getWeatherInfoUrl = (cityKey) =>
    `${baseUrl}currentconditions/v1/${cityKey}?apikey=${apiKey}&language=pt-br&details=true`;

const getCityUrl = (cityName) =>
    `${baseUrl}locations/v1/cities/search?apikey=${apiKey}&q=${cityName}`;

const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Não foi possível obter os dados.");
        }

        return response.json();
    } catch ({ name, message }) {
        console.log(`${name}: ${message}`);
    }
};

const getCityData = (cityName) => fetchData(getCityUrl(cityName));
const getWeatherData = (cityKey) => fetchData(getWeatherInfoUrl(cityKey));

const formatDayName = (dayName) =>
    ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][
        dayName
    ];

const formatMonthName = (monthName) =>
    [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ][monthName];

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayName = date.getDay();

    const stringDate = `${formatDayName(dayName)}, ${day} de ${formatMonthName(
        month
    )}, ${year}`;
    return stringDate;
};
