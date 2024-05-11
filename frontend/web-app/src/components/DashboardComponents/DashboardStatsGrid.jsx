import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { IoPeople, IoSchool, IoHappy, IoTime } from 'react-icons/io5';
import { getStatus } from '../../lib/helpers'; // Import funkcije za dobijanje statusa

export default function DashboardStatsGrid() {
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [totalStudents, setTotalStudents] = useState(0); // Ukupan broj studenata
    const [activeStudents, setActiveStudents] = useState(0); // Broj aktivnih studenata

    function getCurrentDateTime() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        return formattedDate;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-all-students');
                const studentsData = response.data.students;
                const totalStudentsCount = studentsData.length;
                const activeStudentsCount = studentsData.filter(student => getStatus(student) === 'text-green-600').length;
                setTotalStudents(totalStudentsCount);
                setActiveStudents(activeStudentsCount);
            } catch (error) {
                console.error('Greška pri dohvatanju podataka o studentima:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, []);

    // Izračunaj broj neaktivnih studenata
    const inactiveStudents = totalStudents - activeStudents;

    return (
        <div className="flex gap-4">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoSchool className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Reported</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{totalStudents}</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
                    <IoHappy className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Arrived now</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{activeStudents}</strong>
                        <span className="text-sm text-red-500 pl-2">{"-"}{inactiveStudents}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Department</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">
                            <select >
                                <option value="All">All</option>
                                <option value="IT">IT</option>
                                <option value="GR">GR</option>
                                <option value="MA">MA</option>
                            </select>
                        </strong>
                        <span className="text-sm text-red-500 pl-2">
                            <select>
                                <option value="All">All</option>
                                <option value="Master">Master</option>
                                <option value="Undergraduate">Undergraduate</option>
                            </select>
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoTime className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Date</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{currentDateTime}</strong>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
