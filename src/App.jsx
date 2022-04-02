import React, { useState } from 'react'

import Header from './components/Header'
import DetailCard from './components/DetailCard'
import SwiperSlideCard from './components/SwiperSlideCard'
import axios from 'axios'

const App = () => {
  const APIKEY = import.meta.env.VITE_API_KEY
  const APIURL = import.meta.env.VITE_API_URL
  const ICON = import.meta.env.VITE_ICON_URL

  const [noData, setNoData] = useState('No Data Yet')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown location')
  const [weatherIcon, setWeatherIcon] = useState(`${ICON}10n@2x.png`)

  const handleChange = (e) => setSearchTerm(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let search =
      typeof location === 'string'
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`
    try {
      const url = `${APIURL}${search}&appid=${APIKEY}&units=metric&cnt=5&exclude=hourly,minutely`
      const { data } = await axios.get(url)
      if (data.cod != 200) {
        setNoData('Location Not Found')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${ICON + data.list[0].weather[0]['icon']}@4x.png`)
    } catch (error) {
      console.log(error)
    }
  }

  const myIP = (location) => {
    const { latitude, longitude } = location.coords
    getWeather([latitude, longitude])
  }

  return (
    <div className="flex items-center justify-center w-full py-6 lg:mx-0 min-h-screen px-5">
      <div className="flex flex-col lg:flex-row w-full lg:w-[75%]  rounded-3xl shadow-lg bg-gray-200 min-h-[650px]">
        {/* form card section  */}
        <div className="form-container flex flex-col lg:w-1/2 p-5 rounded-3xl gap-4">
          <div className="flex items-center justify-center ">
            <h3
              className="my-auto mr-auto text-xl text-pink-900 font-bold shadow-md py-1 px-3 
            rounded-md bg-white bg-opacity-30"
            >
              Forecast
            </h3>
            <div className="flex p-2 text-white bg-gray-700 bg-opacity-30 rounded-lg">
              <div className="text-right">
                <p className="font-semibold text-sm">{city}</p>
              </div>
            </div>
          </div>
          <div className="flex-grow-[1] flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-2xl">
              The Only Weather Forecast You Need
            </h1>
            <hr className="h-1 bg-white w-1/4 rounded-full my-5" />
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex justify-center w-2/3 relative"
            >
              <div className=" w-full mx-auto relative">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="relative rounded-xl py-2 px-3 bg-gray-300 bg-opacity-60 text-white placeholder-gray-200 w-full focus:outline-none"
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-white hover:text-gray-900 duration-300 ease-linear"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <button
                type="submit"
                onClick={() => {
                  setSearchTerm('')
                  navigator.geolocation.getCurrentPosition(myIP)
                }}
                className="text-gray-100 absolute top-1/2 -translate-y-1/2 -right-8 hover:text-gray-900 duration-300 ease-linear"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* info card section  */}
        <div className="w-full lg:w-1/2 px-10 py-5">
          <Header />
          <div className="flex flex-col my-10">
            {/* card jsx  */}
            {weatherData.length === 0 ? (
              <div className="container p-4 flex items-center justify-center h-1/3 mb-auto">
                <h1 className="text-gray-300 text-4xl font-bold uppercase">
                  {noData}
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-5xl text-gray-800 mt-auto mb-6">Today</h1>
                <DetailCard weather_icon={weatherIcon} data={weatherData} />
                <h1 className="text-2xl text-gray-600 my-6">{city}</h1>
                <SwiperSlideCard listSlice={weatherData.list} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
