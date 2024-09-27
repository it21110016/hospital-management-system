const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    illness: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    treatmentName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Ongoing', 'Completed', 'Discontinued'],
        default: 'Ongoing'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date,

}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema);
