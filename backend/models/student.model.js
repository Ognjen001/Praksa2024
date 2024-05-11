const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    major: { type: String, required: true },
    index: { type: String, required: true },
    last_attendance_time: { type: String, required: true },
    total_attendance: { type: Number, required: true },
}, { collection: 'Students_FR_Today' });

module.exports = mongoose.model('Student', studentSchema);
