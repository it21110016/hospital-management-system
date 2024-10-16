const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    firstName: {
        type: String,
        required: true
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
        enum: ['Admitted', 'Discharged', 'Normal', 'Critical'],
        default: 'Normal'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: Date,

     // Add Emergency Contact Information
     emergencyContact: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true
        }
    },

    // Add a flag for caregiver notifications
    caregiverNotification: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema);
