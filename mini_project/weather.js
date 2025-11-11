import readline from "readline/promises";

const API_KEY = "08ad82bf41b8acdb4e47a46add9bde6e";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found. Please check the city name.");
    }
    const data = await response.json();

    console.log(`\nWeather Info`);
    console.log(`City: ${data.name}`);
    console.log(`Temperature: ${data.main.temp}°C`);
    console.log(`Description: ${data.weather[0].description}`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Wind Speed: ${data.wind.speed} m/s\n`);
    console.log("data: ", data)
  } catch (error) {
    console.log(error.message);
  }
};

const city = await rl.question("Enter a city name to get weather: ");
await getWeather(city);
rl.close();
