import React ,{ useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'
import './index.css'

function App() {
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState(``)



  useEffect(() => {
    const fetchData = async () => 
    {
      try {
        const result = await Axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
      setWeather(result.data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    };
    if (location) 
    {
      fetchData()
    }
    
  }, [location])


  const handleLocationChange =(e) => {
    setLocation(e.target.value)
  }
  return (
    <>
    <div className='app-container'>
    <h1 className='app-title'>Weather App</h1>
    <div className='input-container'>
      <input
        className='app-input'
        type='text'
        placeholder='Enter a city'
        onChange={handleLocationChange}
      />
    </div>
    </div>
    <div>
      {weather.current && (
        <div className='weather-container'>
          {weather.forecast.forecastday.map((day) => (
          <div className='weather-card' key={day.date}>
            <h2 className='date'> {day.date}</h2>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <hr />
            <p className='condition'>{day.day.condition.text}</p>
            <div className='weather'>
              <hr />
              <p>Max: {day.day.maxtemp_c}°C</p>
              <p>Min: {day.day.mintemp_c}°C</p>
              <p>Avg: {day.day.avgtemp_c}°C</p>
            </div>

          </div>
          ))}
        </div>
      )}
    </div>  
    </>
  )
}

export default App
