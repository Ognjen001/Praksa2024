import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Oct',
		Did_not_come: 1890,
		Has_come: 4800
	},
	{
		name: 'Nov',
		Did_not_come: 2390,
		Has_come: 3800
	},
	{
		name: 'Dec',
		Did_not_come: 3490,
		Has_come: 4300
	},
	{
		name: 'Jan',
		Did_not_come: 4000,
		Has_come: 2400
	},
	{
		name: 'Feb',
		Did_not_come: 3000,
		Has_come: 1398
	},
	{
		name: 'Mar',
		Did_not_come: 2000,
		Has_come: 9800
	},
	{
		name: 'Apr',
		Did_not_come: 2780,
		Has_come: 3908
	},
	{
		name: 'May',
		Did_not_come: 1890,
		Has_come: 4800
	},
	{
		name: 'Jun',
		Did_not_come: 2390,
		Has_come: 3800
	}
]

export default function AttendaceChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Attendance</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Has_come" fill="#0ea5e9" />
						<Bar dataKey="Did_not_come" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
