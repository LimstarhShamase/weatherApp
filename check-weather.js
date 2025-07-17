   document.getElementById('getWeather').onclick = () => {
      const city = document.getElementById('city').value.trim();
      if (!city) return alert('Please enter a city.');

      const key = 'c8307ab821ef43b6853e32f8d803838b';
      const url = `https://api.weatherstack.com/current?access_key=${key}&query=${encodeURIComponent(city)}`;

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = 'Loading...';

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.error) throw new Error(data.error.info);
          const { temperature, feelslike, weather_descriptions, weather_icons, humidity, wind_speed } = data.current;
          resultDiv.innerHTML = `
            <img src="${weather_icons[0]}" alt="${weather_descriptions[0]}">
            <h3>${weather_descriptions[0]}</h3>
            <p><strong>${temperature}°C</strong> (Feels like ${feelslike}°C)</p>
            <p>Humidity: ${humidity}% • Wind: ${wind_speed} km/h</p>
          `;
        })
        .catch(err => {
          resultDiv.innerHTML = `<p>Error: ${err.message}</p>`;
        });
    };