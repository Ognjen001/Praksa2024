import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { getStatus } from '../../lib/helpers';

const AttendanceTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-all-students');
                const studentsData = response.data.students;
                const studentsWithStatus = studentsData.map(student => ({
                    ...student,
                    status: getStatus(student)
                }));
                setStudents(studentsWithStatus);
            } catch (error) {
                console.error('Greška pri dohvatanju podataka o studentima:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Attendance Table</strong>
            <div className="border-x border-gray-200 rounded-sm mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Majir</th>
                            <th>Index ID</th>
                            <th>Last attendance time</th>
                            <th>Degree</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student._id}</td>
                                <td>{student.name}</td>
                                <td>{student.major}</td>
                                <td>{student.index}</td>
                                <td>{student.last_attendance_time}</td>
                                <td>{student.degree}</td>
                                <td className={`${student.status} font-bold`}>{student.status === 'text-green-600' ? 'Active' : 'Not Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default AttendanceTable;
