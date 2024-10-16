
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function InventoryUpdate() {

    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState('')
    const [pricePerUnit, setPricePerUnit] = useState(0)
    const [supplier, setSupplier] = useState('')
    const [manufactureDate, setManufactureDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const navigate = useNavigate();
    
    const {id} = useParams();
    
    const getInventory = () => {
        axios.get("http://localhost:8040/inventory/get/"+id)
        .then((res) => {
            const Inventory = {
               itemName: res.data.itemName,
                description: res.data.description,
                category: res.data.category,
                quantity: res.data.quantity,
                unit: res.data.unit,
                pricePerUnit: res.data.pricePerUnit,
                supplier: res.data.supplier,
                manufactureDate: res.data.manufactureDate.split('T')[0],
                expiryDate: res.data.expiryDate.split('T')[0]
            }

            console.log(res.data);
            setItemName(Inventory.itemName);
            setDescription(Inventory.description);
            setCategory(Inventory.category);
            setQuantity(Inventory.quantity);
            setUnit(Inventory.unit);
            setPricePerUnit(Inventory.pricePerUnit);
            setSupplier(Inventory.supplier);
            setManufactureDate(Inventory.manufactureDate);
            setExpiryDate(Inventory.expiryDate);
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    useEffect(() => getInventory(), []);

    return (
          <div style={{background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)",
            minHeight: "100vh",}}>
            <div className="form-style-5"> 
            <form  onSubmit={(e) => {
                            e.preventDefault();

                            
                        const newInventory = {
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
                                    
                            axios.put("http://localhost:8040/inventory/update/"+id, newInventory)
                            .then(() => {
                                toast.success('Inventory Updated');
                                navigate('/inventory');
                            })
                            .catch((err) => {
                                alert(err);
                            })
                        }}>
                <div className="container"> <br/>
            <center><h1>Update Inventory</h1></center>
            <br></br><br></br>
            <div></div>

            <div className="form-group row">
                <label htmlFor="itemName" className="col-sm-2 col-form-label">Item Name</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" placeholder='Enter Item Name' value={itemName} onChange={(e)=>{
                    setItemName(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-8">
                <input type="text" className="form-control"  placeholder="Enter the description" value={description} onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Supply">Supply</option>
                                    <option value="Consumable">Consumable</option>
                                </select>
                            </div>
                        </div>
                        <br />

            <div className="form-group row">
                <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                <div className="col-sm-8">
                <input type="text" className="form-control"  placeholder="Enter the Quantity"
                value={quantity}
                onChange={(e)=>{
                    setQuantity(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                            <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="pieces">pieces</option>
                                    <option value="packs">packs</option>
                                    <option value="liters">liters</option>
                                    <option value="boxes">boxes</option>
                                    <option value="units">units</option>
                                    <option value="bottles">bottles</option>
                                </select>
                            </div>
                        </div>
                        <br />

            <div className="form-group row">
                <label htmlFor="pricePerUnit" className="col-sm-2 col-form-label">Price Per Unit</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter Price Per Unit" 
                value={pricePerUnit}
                onChange={(e)=>{
                    setPricePerUnit(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="supplier" className="col-sm-2 col-form-label">Supplier</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter supplier" value={supplier} onChange={(e)=>{
                    setSupplier(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="manufactureDate" className="col-sm-2 col-form-label">Manufacture Date</label>
                <div className="col-sm-8">
                <input type="date" className="form-control" placeholder="Enter the Manufacture Date" value={manufactureDate} onChange={(e)=>{
                    setManufactureDate(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="expiryDate" className="col-sm-2 col-form-label">Expiry Date</label>
                <div className="col-sm-8">
                <input type="date" className="form-control" placeholder="Enter the Expiry Date" value={expiryDate} onChange={(e)=>{
                    setExpiryDate(e.target.value);
                }}/>
                </div>
            </div><br/>
            
            <center><button type="submit" className="btn btn-dark" >Submit</button></center><br/>
            <Link to="/inventory">
                     <button type="button2" class="btn btn-outline-danger"> Back </button>
            </Link>
            </div>
                </form><br></br>
                </div>
                <hr/></div>
                
    );
};

export default InventoryUpdate;