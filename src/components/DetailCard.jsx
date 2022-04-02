import moment from 'moment'

function DetailCard({ weather_icon, data }) {
  const { clouds, main, weather } = data.list[0]

  return (
    <div className="container p-4 flex items-center justify-center shadow-lg rounded-lg bg-white h-1/3 mb-auto">
      <div className="my-auto w-[55%]">
        <p className="font-bold text-5xl text-pink-800 mb-2">
          {Math.round(main.temp)}&deg;C
        </p>
        <p className="text-4xl text-gray-800 tracking-widest">
          {weather[0].main}
          <img src={weather_icon} className="w-1/4 inline" />
        </p>
        <p className="text-gray-400 text-xs uppercase tracking-widest">
          {weather[0].description}s
        </p>
        <p className="tracking-wider">{moment().format('dddd MMM YYYY')}</p>
      </div>
      <div className="my-2 border-l-2 border-gray-100 p-2">
        <p className="text-gray-400 text-lg">
          RealFeel:{' '}
          <span className="font-bold text-gray-800">
            {Math.round(main.feels_like)}&deg;C
          </span>
        </p>
        <p className="text-gray-400 text-lg">
          Humidity:{' '}
          <span className="font-bold text-gray-800">{main.humidity}%</span>
        </p>
        <p className="text-gray-400 text-lg">
          Cloud Cover:{' '}
          <span className="font-bold text-gray-800">{clouds.all}%</span>
        </p>
        <p className="text-gray-400 text-lg">
          Min Temp:{' '}
          <span className="font-bold text-gray-800">
            {Math.round(main.temp_min)}&deg;C
          </span>
        </p>
        <p className="text-gray-400 text-lg">
          Max Temp:{' '}
          <span className="font-bold text-gray-800">
            {Math.round(main.temp_max)}&deg;C
          </span>
        </p>
      </div>
    </div>
  )
}

export default DetailCard
