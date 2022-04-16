const key = 'e6808f387332cb87f5669c5218b9a5af';
const form = document.querySelector('form');
const details = document.querySelector('.info');

form.addEventListener('submit', e => {
    e.preventDefault();
    details.innerHTML = "<h1>Searching...</h1>";
    const search = e.target.search.value;
    weatherApp(search);
    form.reset();
});

async function weatherApp(search) {
    const searchResults = await fetchAPI(search);
    displayResults(searchResults);
};

async function fetchAPI(search) {
    const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${search}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data);
    return data;
};

function displayResults(data) {
    const html = `  
                        <div class="main-info">
                            <h2 id="name">${data.location.name}</h2>
                            <h2 id="temp">${data.current.temperature} °c</h2>
                            <h2 id="status">${data.current.weather_descriptions.map(item => item).join(' ')}</h2>
                        </div>
                        <div class="more-info">
                            <p>Feels Like ${data.current.feelslike}°c</p>
                            <p>Cloud Cover: ${data.current.cloudcover}</p>
                            <p>Humidity: ${data.current.humidity}%</p>
                            <p>Last Checked at: ${data.current.observation_time}</p>
                            <h5>${data.request.query}</h5>
                        </div>
                    `
    details.innerHTML = html;
    console.log((data.current.temperature * 9/5) +32);
}