const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const weatherAPIKey = ''; 

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;

  try {
    const weatherData = await getWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

async function getWeatherData(cities) {
  const weatherData = {};

  const promises = cities.map(async (city) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${city}`;
    const response = await axios.get(url);
    const temperature = response.data.current.temp_c;
    weatherData[city] = `${temperature}C`;
  });

  await Promise.all(promises);

  return weatherData;
}

const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
