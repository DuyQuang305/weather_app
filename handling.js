const body = document.querySelector('body')
const searchInput = document.querySelector('.weather__input')
const cityName = document.querySelector('.city')
const countryName = document.querySelector('.country')
const time = document.querySelector('.hour')
const day = document.querySelector('.day')
const temperature = document.querySelector('.weather__temperature .number')
const descTitle = document.querySelector('.weather__short-desc-title')
const visibility = document.querySelector('.visibility__data-number')
const wind = document.querySelector('.wind__data-number')
const humidity = document.querySelector('.humidity__data-number')
const content = document.querySelector('.weather__temperature')

 async  function changeWeatherUi() {
        searchInput.value.trim()
        const city = searchInput.value
        const Api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=856609b22d015e6116ce26f8053b7e87`
        const data = await fetch(Api)
                                .then (response => response.json())
        if (data.cod === 200) {
                const convertedWeather = Math.round(data.main.temp - 273.15)
                
                if(convertedWeather >= 32) {
                        body.setAttribute('class', 'hot')
                } else  if(convertedWeather  >= 23 && convertedWeather  <= 32) {
                        body.setAttribute('class', 'warm')
                } else if (convertedWeather  < 23) {
                        body.setAttribute('class', 'cool')
                }

                cityName.innerText = data.name
                countryName.innerText = data.sys.country
                time.innerText = new Date().toLocaleTimeString()
                day.innerText = new Date().toLocaleDateString()
                temperature.innerText = convertedWeather
                descTitle.innerText = data.weather[0].main
                visibility.innerText = data.visibility
                wind.innerText = data.wind.speed
                humidity.innerText = data.main.humidity
             
        } else {
                cityName.innerText = 'undefined'
        }

}


changeWeatherUi()

// Lắng nghe sự kiện enter để lấy value trong input
document.addEventListener('keypress', (e) => {
        if (e.code === 'Enter') {
                changeWeatherUi()
        }
} )