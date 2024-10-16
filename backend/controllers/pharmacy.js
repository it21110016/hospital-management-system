const Pharmacy = require('../moduls/pharmacy'); // Import your Pharmacy model
const fs = require('fs');
const path = require('path');

// Add a new Order
exports.addOrder = async (req, res) => {
    try {
        const orderData = {
            drugId: req.body.drugId,
            drugName: req.body.drugName,
            // picture: req.file ? req.file.filename : null, // Save filename if present

            category: req.body.category,
            storeBox: req.body.storeBox,
            contactNumber: req.body.contactNumber,
            sellingPrice: req.body.sellingPrice,
            quantity: req.body.quantity,
            company: req.body.company,
            effects: req.body.effects,
            expireDate: req.body.expireDate

            // status: req.body.status,
            // startDate: req.body.startDate,
            // endDate: req.body.endDate
        };

        const newOrder = new Pharmacy(orderData);
        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: 'Order added successfully!',
            Order: savedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding Order',
            error: error.message
        });
    }
};

// updates an existing order by its ID using data from the request body.
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedData = {
      drugId: req.body.drugId,
            drugName: req.body.drugName,
            // picture: req.file ? req.file.filename : null, // Save filename if present
            
            category: req.body.category,
            storeBox: req.body.storeBox,
            contactNumber: req.body.contactNumber,
            sellingPrice: req.body.sellingPrice,
            quantity: req.body.quantity,
            company: req.body.company,
            effects: req.body.effects,
            expireDate: req.body.expireDate

            // status: req.body.status,
            // startDate: req.body.startDate,
            // endDate: req.body.endDate
        };

        const updatedOrder = await Pharmacy.findByIdAndUpdate(orderId, updatedData, { new: true });
        
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order updated successfully!',
            Order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating Order',
            error: error.message
        });
    }
};

// retrieves all orders from the database.
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Pharmacy.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching Orders',
            error: error.message
        });
    }
};

// fetches an order by its ID.
exports.getOneOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Pharmacy.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Delete a order by id
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Pharmacy.findByIdAndDelete(orderId);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully!',
            Order: deletedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Order',
            error: error.message
        });
    }
};
