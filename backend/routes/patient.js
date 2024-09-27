const express = require('express');
const { addPatient, updatePatient,getAllPatients, deletePatient, getOnePatient } = require('../controllers/patient');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'UploadImage/Patients')
    },
    filename: function(req, file,cb){
        cb(null,Date.now() + '_' + file.originalname);
    }
})

const upload = multer({storage});


router.post('/add',upload.single('picture'),addPatient);
router.delete('/delete/:id',deletePatient);
router.put('/update/:id',upload.single('picture'),updatePatient);
router.get("/get", getAllPatients);
router.get("/get/:id", getOnePatient);

module.exports = router;