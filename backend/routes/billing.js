const express = require('express');
const { addBilling, updateBilling,getAllBilling, deleteBilling, getOneBilling } = require('../controllers/billing');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'UploadImage/Billing')
    },
    filename: function(req, file,cb){
        cb(null,Date.now() + '_' + file.originalname);
    }
})

const upload = multer({storage});


router.post('/add',upload.single('picture'),addBilling);
router.delete('/delete/:id',deleteBilling);
router.put('/update/:id',upload.single('picture'),updateBilling);
router.get("/get", getAllBilling);
router.get("/get/:id", getOneBilling);

module.exports = router;