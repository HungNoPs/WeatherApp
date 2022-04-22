import moment from 'moment'

function SummaryCard({ day }) {
	let day_icon = `${
		import.meta.env.VITE_ICON_URL + day.weather[0]['icon']
	}@2x.png`
	return (
		<div className=" bg-gray-800 rounded-md h-full ">
			<div className="container p-4 flex items-center justify-center  rounded-lg my-auto mr-1 h-full">
				<div className="my-auto">
					<p className="font-bold text-3xl text-cyan-400 mb-2">
						{Math.round(day.main.temp)}&deg;C
					</p>
					<p className="text-2xl text-gray-100 tracking-widest flex justify-between items-center">
						{day.weather[0].main}
						<img src={day_icon} className="h-9 object-cover" />
					</p>
					<p className="text-gray-200 text-xs uppercase tracking-widest">
						{day.weather[0].description}
					</p>
					<p className="tracking-wider text-cyan-200 mb-auto">
						{moment(day.dt_txt).format('dddd hh:mm')}am
					</p>
				</div>
			</div>
		</div>
	)
}

export default SummaryCard
