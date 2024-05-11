import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const courseRole = [
	{
		id: '6534',
		name: 'Milovan Milivojevic',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSH-WTVJt66FpN7mDn7USSs0rsaM2NMjMzztY9IA1NDA&s',
		role: 'Professor',
		title: "Dr."
	},
	{
		id: '3432',
		name: 'Ana Petrovic',
		image: 'https://i1.rgstatic.net/ii/profile.image/741756219965440-1553859872226_Q512/Ana-Petrovic.jpg',
		role: 'Assistent',
		title: "Dr."
	},
	{
		id: '7633',
		name: 'Branko Gavrilovic',
		image: 'https://ocdn.eu/pulscms-transforms/1/oCbk9kpTURBXy85NGM1NWFjYWU4MWU2MDkwODg1ZGJiMjE2MDkxZjU0Yy5qcGeRkwLNBLAA3gABoTAB',
		role: 'Assistent',
		title: "Spec."
	}
]

function CourseRole() {
	return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Professors and assistents in the course</strong>
			<div className="mt-4 flex flex-col gap-3">
				{courseRole.map((prof) => (
					<Link
						key={prof.id}
						to={`#`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={prof.image}
								alt={prof.name}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{prof.name}</p>
							<span
								className={classNames(
									prof.title === 0
										? 'text-red-500'
										: prof.title > 50
										? 'text-green-500'
										: 'text-orange-500',
									'text-xs font-medium'
								)}
							>
								{prof.title}
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{prof.role}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default CourseRole
