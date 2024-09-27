const Patient = require('../moduls/patient'); // Import your Patient model
const fs = require('fs');
const path = require('path');

// Add a new patient
exports.addPatient = async (req, res) => {
    try {
        const patientData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            picture: req.file ? req.file.filename : null, // Save filename if present
            age: req.body.age,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            address: req.body.address,
            illness: req.body.illness,
            doctorName: req.body.doctorName,
            treatmentName: req.body.treatmentName,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        const newPatient = new Patient(patientData);
        const savedPatient = await newPatient.save();
        res.status(201).json({
            message: 'Patient added successfully!',
            patient: savedPatient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding patient',
            error: error.message
        });
    }
};

// Update an existing patient
exports.updatePatient = async (req, res) => {
    try {
        const patientId = req.params.id;

        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            picture: req.file ? req.file.filename : undefined, // Update picture if a new file is uploaded
            age: req.body.age,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            address: req.body.address,
            illness: req.body.illness,
            doctorName: req.body.doctorName,
            treatmentName: req.body.treatmentName,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        const updatedPatient = await Patient.findByIdAndUpdate(patientId, updatedData, { new: true });
        
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({
            message: 'Patient updated successfully!',
            patient: updatedPatient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating patient',
            error: error.message
        });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching patients',
            error: error.message
        });
    }
};

// Get a single patient by ID
exports.getOnePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId);
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching patient',
            error: error.message
        });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;
        const deletedPatient = await Patient.findByIdAndDelete(patientId);
        
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Optionally delete the patient's picture file
        if (deletedPatient.picture) {
            fs.unlink(path.join('UploadImage/Patients', deletedPatient.picture), (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        res.status(200).json({
            message: 'Patient deleted successfully!',
            patient: deletedPatient
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting patient',
            error: error.message
        });
    }
};
