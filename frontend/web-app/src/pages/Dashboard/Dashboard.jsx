import React from 'react'
import DashboardStatsGrid from '../../components/DashboardComponents/DashboardStatsGrid'
import AttendaceChart from '../../components/DashboardComponents/AttendaceChart'
import AttendaceTodayPieChart from '../../components/DashboardComponents/AttendaceTodayPieChart'
import CourseRole from '../../components/DashboardComponents/CourseRole'
import Navbar from '../../components/Navbar/Navbar'
import ArrivalTable from '../../components/DashboardComponents/ArrivalTable'
import Sidebar from '../../components/Sidebar/Sidebar'


export default function Dashboard() {
	return (
		<>
		<Navbar/>
		<div className="flex">
		<Sidebar/>
		<div className="flex flex-col gap-4 w-full">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<AttendaceChart />
				<AttendaceTodayPieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<ArrivalTable />
				<CourseRole />
			</div>
		</div>
		</div>
		</>
	)
}
