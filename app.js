document.getElementById('submitBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput');
    const cities = cityInput.value.split(',').map(city => city.trim());
  
    if (cities.length === 0) {
      alert('Please enter at least one city.');
      return;
    }
  
    const data = { cities };
  
    fetch('/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => displayWeatherResults(result.weather))
      .catch(error => {
        console.error('Error retrieving weather data:', error);
        alert('Unable to fetch weather data. Please try again.');
      });
  });
  
  function displayWeatherResults(weatherData) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = '';
  
    for (const city in weatherData) {
      const temperature = weatherData[city];
      const resultElement = document.createElement('p');
      resultElement.textContent = `${city}: ${temperature}`;
      weatherResults.appendChild(resultElement);
    }
  }
  