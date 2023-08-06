import axios from 'axios'
import { useState, useEffect } from 'react'

const Countries = ({countries, filter}) => {
  
  const [singleCountryToShow, setSingleCountryToShow] = useState(null)
  const [currentFilter, setCurrentFilter] = useState(null)

  if(currentFilter !== filter){
    setSingleCountryToShow(null)
    setCurrentFilter(filter)
  }
  if(singleCountryToShow !== null) {
    return (
      <SingleCountryInfo country = {singleCountryToShow}/>
    )
  }
    if(countries.length === 1){
      return (
        <SingleCountryInfo country = {countries[0]}/>
      )
    }
      return (
        <div>
          {countries.map((country, id) => 
          <CountryListItem country={country} id={id} setSingleCountryToShow={setSingleCountryToShow}/>
          )}
        </div>
      )
  }

const CountryListItem = ({country, id, setSingleCountryToShow}) => {
    return (
      <div>
        <p key={id}>{country.name.common}</p>
        <Button handleClick={() => {setSingleCountryToShow(country)}} text="show"/>
      </div>
    )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button> 
)

const SingleCountryInfo = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <b>Languages:</b>
      <ul>
        {languages.map((language, i) =>
          <li key={i}>
            {language}
          </li>
        )}
      </ul>
      <img
        src={country.flags.png}
        width={200}>
     </img>
     <WeatherInfo capital={country.capital[0]} lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]}/>
    </div>
  )
}

const WeatherInfo = ({capital, lat, lng}) => {
  const [weatherData, setWeatherData] = useState(
    {"main": {"temp": 0},
     "wind": {"speed": 0},
     "weather": [{"icon":"01d"}]
    })

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('weather effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        console.log('Weather promise fulfilled')
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [])

  const celsius = (weatherData.main.temp - 273.15).toFixed(2)
  const imgSource = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

return(
  <div>
    <h3>Weather in {capital}</h3>
    <p>Temperature: {celsius} Celsius</p>
    <img src={imgSource}/>
    <p>Wind: {weatherData.wind.speed} m/s</p>
  </div>
)
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        setCountryData(response.data)
      })
  }, [])
  //console.log('render', countryData, 'countries')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log("pituus ", CountriesMatchingFilter.lenght)
  }

  const CountriesMatchingFilter = countryData.filter(
    country => country.name.common.toLowerCase()
    .includes(filter.toLowerCase())
    )

  const CountriesToShow = (filter.length > 0 && CountriesMatchingFilter.length < 5)
      ? CountriesMatchingFilter
      : []


  return (
    <div>
      find countries <input
        value={filter}
        onChange={handleFilterChange}
      />
      <Countries countries={CountriesToShow} filter={filter}/>
    </div>
    
  )
}
export default App;
