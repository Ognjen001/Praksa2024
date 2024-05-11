import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { getStatus } from '../../lib/helpers';

const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}

export default function AttendaceTodayPieChart() {
    const [activeStudents, setActiveStudents] = useState(0);
    const [inactiveStudents, setInactiveStudents] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-all-students');
                const studentsData = response.data.students;
                const activeStudentsCount = studentsData.filter(student => getStatus(student) === 'text-green-600').length;
                setActiveStudents(activeStudentsCount);
                setInactiveStudents(studentsData.length - activeStudentsCount);
            } catch (error) {
                console.error('Greška pri dohvatanju podataka o studentima:', error);
            }
        };

        fetchData();
    }, []);

    const data = [
        { name: 'Has come', value: activeStudents }, 
        { name: 'Did not come', value: inactiveStudents }, 
    ];

    return (
        <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            <strong className="text-gray-700 font-medium">Attendance today</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
