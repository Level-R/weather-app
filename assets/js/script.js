const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherResult = document.getElementById('weatherResult');
const loading = document.getElementById('loading');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (!location) return;

    weatherResult.classList.add('hidden');
    loading.classList.remove('hidden');

    const apiKey = '89781938e3f64e689dc43508251708';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Location not found.");
      const data = await res.json();
      displayWeather(data);
    } catch (err) {
      weatherResult.innerHTML = `<p style="color:red;">${err.message}</p>`;
      weatherResult.classList.remove('hidden');
    } finally {
      loading.classList.add('hidden');
    }
  });

  function displayWeather(data) {
    const { location, current } = data;

    const isDay = current.is_day ? 'Day' : 'Night';
    const iconUrl = `https:${current.condition.icon}`;

    weatherResult.innerHTML = `
      <h3>${location.name}, ${location.country}</h3>
      <p><small>Local time: ${location.localtime}</small></p>
      <img src="${iconUrl}" alt="${current.condition.text}" />
      <p><strong>${current.condition.text}</strong></p>

      <div class="weather-data">
        <p>🌡 Temperature: ${current.temp_c}°C</p>
        <p>🥶 Feels Like: ${current.feelslike_c}°C</p>
        <p>💨 Wind: ${current.wind_kph} km/h</p>
        <p>💧 Humidity: ${current.humidity}%</p>
        <p>🔭 Visibility: ${current.vis_km} km</p>
        <p>🌞 UV Index: ${current.uv}</p>
        <p>🌓 Time of Day: ${isDay}</p>
      </div>
    `;

    weatherResult.classList.remove('hidden');
  }
}
