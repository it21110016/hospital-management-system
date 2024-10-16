let Inventory = require("../moduls/inventory");

exports.AddInventory = ((req,res) => {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const category = req.body.category;
    const quantity = req.body.quantity;
    const unit = req.body.unit;
    const pricePerUnit = req.body.pricePerUnit;
    const supplier = req.body.supplier;
    const manufactureDate = req.body.manufactureDate;
    const expiryDate = req.body.expiryDate;

    const newInventory = new Inventory({
        itemName,
        description,
        category,
        quantity,
        unit,
        pricePerUnit,
        supplier,
        manufactureDate,
        expiryDate
    })

    newInventory.save().then(()=>{
        res.json("Inventory Added")
    }).catch((err) => {
        console.log(err);
    })

})

exports.UpdateInventory= (async(req,res)=>{
    let userId = req.params.id;
    const { itemName, 
        description, 
        category, 
        quantity, 
        unit, 
        pricePerUnit, 
        supplier, 
        manufactureDate, 
        expiryDate} = req.body;
     
    const updateInventory = {
        itemName, 
        description, 
        category, 
        quantity, 
        unit, 
        pricePerUnit, 
        supplier, 
        manufactureDate, 
        expiryDate
    }

    const update = await Inventory.findByIdAndUpdate(userId, updateInventory).then(() => {
        res.status(200).send({status: "Inventory Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

exports.DeleteInventory = (async (req,res) =>{
     let userId = req.params.id;

     await Inventory.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Inventory deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})

exports.GetOneInventory= (async (req,res) => {
    let userId = req.params.id;
    
    const inventory = await Inventory.findById(userId)
    .then((inven) => {
        res.json(inven);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

exports.GetInventory= ((req,res) =>{
    Inventory.find().then((inven)=>{
        res.json(inven)
    }).catch((err) =>{
        console.log(err)
    })
})
