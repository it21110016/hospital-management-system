const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InventorySchema = new Schema({

    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Medicine', 'Equipment', 'Supply', 'Consumable'], // Categories specific to hospital inventory
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
        enum: ['pieces', 'packs', 'liters', 'boxes', 'units', 'bottles'], // Different unit types for hospital items
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
    supplier: {
        type: String,
        trim: true
    },
    manufactureDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
    },
    
},{timestamps:true})


module.exports = mongoose.model("inventory",InventorySchema);
