const Billing = require('../moduls/billing'); // Import your Billing model
const fs = require('fs');
const path = require('path');

// Add a new bill
exports.addBilling = async (req, res) => {
    try {
        const billingData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            picture: req.file ? req.file.filename : null, // Save filename if present
            age: req.body.age,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            treatmentType: req.body.treatmentType,
            treatmentCost: req.body.treatmentCost,
            treatmentType1: req.body.treatmentType1,
            treatmentCost1: req.body.treatmentCost1,
            treatmentType2: req.body.treatmentType2,
            treatmentCost2: req.body.treatmentCost2,
            totalCost: req.body.totalCost,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        const newBilling = new Billing(billingData);
        const savedBilling = await newBilling.save();
        res.status(201).json({
            message: 'Bill added successfully!',
            patient: savedBilling
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding bill',
            error: error.message
        });
    }
};

// Update an existing bill
exports.updateBilling = async (req, res) => {
    try {
        const billingId = req.params.id;

        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            picture: req.file ? req.file.filename : undefined, // Update picture if a new file is uploaded
            age: req.body.age,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            treatmentType: req.body.treatmentType,
            treatmentCost: req.body.treatmentCost,
            treatmentType1: req.body.treatmentType1,
            treatmentCost1: req.body.treatmentCost1,
            treatmentType2: req.body.treatmentType2,
            treatmentCost2: req.body.treatmentCost2,
            totalCost: req.body.totalCost,
            endDate: req.body.endDate
        };

        const updatedBilling = await Billing.findByIdAndUpdate(billingId, updatedData, { new: true });
        
        if (!updatedBilling) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json({
            message: 'Bill updated successfully!',
            billing: updatedBilling
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating bill',
            error: error.message
        });
    }
};

// Get all bills
exports.getAllBilling = async (req, res) => {
    try {
        const billing = await Billing.find();
        res.status(200).json(billing);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bills',
            error: error.message
        });
    }
};

// Get a single bill by ID
exports.getOneBilling = async (req, res) => {
    try {
        const billingId = req.params.id;
        const billing = await Billing.findById(billingId);
        
        if (!billing) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        res.status(200).json(billing);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bill',
            error: error.message
        });
    }
};

// Delete a bill
exports.deleteBilling = async (req, res) => {
    try {
        const billingId = req.params.id;
        const deletedBilling = await Billing.findByIdAndDelete(billingId);
        
        if (!deletedBilling) {
            return res.status(404).json({ message: 'bill not found' });
        }

        // Optionally delete the patient's picture file
        if (deletedBilling.picture) {
            fs.unlink(path.join('UploadImage/Billing', deletedBilling.picture), (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        res.status(200).json({
            message: 'Bill deleted successfully!',
            patient: deletedBilling
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting bill',
            error: error.message
        });
    }
};
