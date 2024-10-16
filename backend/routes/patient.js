const express = require('express');
const { addPatient, updatePatient, getAllPatients, deletePatient, getOnePatient, sendEmergencyNotification } = require('../controllers/patient');
const router = express.Router();

router.post('/add', addPatient);
router.delete('/delete/:id', deletePatient);
router.put('/update/:id', updatePatient);
router.put('/notification/:id', sendEmergencyNotification);
router.get("/get", getAllPatients);
router.get("/get/:id", getOnePatient);

module.exports = router;