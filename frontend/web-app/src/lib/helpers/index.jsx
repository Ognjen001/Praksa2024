export function getStatus(student) {
    const today = new Date();
    const lastAttendanceTime = new Date(student.last_attendance_time);

    // Proveri da li je poslednje prisustvo istog dana kao današnji dan
    const isSameDay = today.toDateString() === lastAttendanceTime.toDateString();

    return isSameDay ? 'text-green-600' : 'text-red-600';
}
