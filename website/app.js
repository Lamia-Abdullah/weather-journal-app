// Personal API Key for OpenWeatherMap API
const apiKey = 'fc1ab770faaa9d6e51807d78181dfc97&units=imperial';

// GET Web API Data
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(`${baseURL}?zip=${zip},us&appid=${key}`);
  try {
    const data = await res.json();
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

//  POST Data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Function to Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + '°F';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
};

// Base URL for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event Listener
document.getElementById('generate').addEventListener('click', () => {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseURL, zip, apiKey)
    .then((data) => {
      if (data && data.main) {
        postData('/add', {
          temp: data.main.temp,
          date: new Date().toLocaleDateString(),
          feelings: feelings,
        })
        .then(updateUI);
      } else {
        console.log('Invalid data received from API');
      }
    });
});
