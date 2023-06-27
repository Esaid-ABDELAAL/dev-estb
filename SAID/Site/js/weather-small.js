const container_small = document.querySelector('.container_small');
const search_small = document.querySelector('.search-box_small button');
const weatherBox_small = document.querySelector('.weather-box_small');
const weatherDetails_small = document.querySelector('.weather-details_small');
const error404_small = document.querySelector('.not-found_small');

const APIKey_small = '5e578d2a9f91a6674ecaa55c50cb28ee';
const city_small = 'CROISSY-BEAUBOURG';

cityOutput_small.textContent = city_small;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_small}&lang=fr&units=metric&appid=${APIKey_small}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404') {
            container_small.style.height = '400px';
            weatherBox_small.style.display = 'none';
            weatherDetails_small.style.display = 'none';
            error404_small.style.display = 'block';
            error404_small.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image_small = document.querySelector('.weather-box_small img');
        const temperature_small = document.querySelector('.weather-box_small .temperature_small');
        const description_small = document.querySelector('.weather-box_small .description_small');
        // const humidity = document.querySelector('.weather-details_small .humidity_small span');
        // const wind = document.querySelector('.weather-details_small .wind_small span');

        switch (json.weather[0].main) {
            case 'Clear':
                image_small.src = 'img/clear.png';
                break;

            case 'Rain':
                image_small.src = 'img/rain.png';
                break;

            case 'Snow':
                image_small.src = 'img/snow.png';
                break;

            case 'Clouds':
                image_small.src = 'img/cloud.png';
                break;

            default:
                image_small.src = '';
        }

        temperature_small.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description_small.innerHTML = `${json.weather[0].description}`;
        // humidity.innerHTML = `${json.main.humidity}%`;
        // wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


        weatherBox_small.style.display = '';
        weatherDetails_small.style.display = '';
        weatherBox_small.classList.add('fadeIn');
        weatherDetails_small.classList.add('fadeIn');
        container_small.style.height = '330px';

    });
