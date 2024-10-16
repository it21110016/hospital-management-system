const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const billingSchema = new Schema({

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
    treatmentType: {
        type: String,
        required: true
    },
    treatmentCost: {
        type: Number,
        required: true,
    },
    treatmentType1: {
        type: String,
        required: false
    },
    treatmentCost1: {
        type: Number,
        required: false,
    },
    treatmentType2: {
        type: String,
        required: false
    },
    treatmentCost2: {
        type: Number,
        required: false,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    endDate: Date,

}, { timestamps: true })

module.exports = mongoose.model("billing", billingSchema);
