const express = require('express');
const { addOrder, updateOrder,getAllOrders, deleteOrder, getOneOrder } = require('../controllers/pharmacy');
const router = express.Router();
const path = require('path');


router.post('/add',addOrder);
router.delete('/delete/:id',deleteOrder);
router.put('/update/:id',updateOrder);
router.get("/get", getAllOrders);
router.get("/get/:id", getOneOrder);

module.exports = router;