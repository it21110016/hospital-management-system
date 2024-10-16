import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';

const AddInventory = () => {

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

    const sendData = (e) => {
       
        e.preventDefault();

        if (itemName === '') {
            toast.error("Please Provide Item Name..", {
                id: 'IDI'
            })
        }
        else if (description === '') {
            toast.error("Please Provide Item Description..", {
                id: 'Itp'
            })
        }
        else if (category === '') {
            toast.error("Please Provide Item Category..", {
                id: 'Iname'
            })
        }else if (quantity === 0 || isNaN(quantity)) {
            toast.error("Please Provide quantity..", {
                id: 'ILocation'
            })
        }else if (unit === '') {
            toast.error("Please Provide Unit..", {
                id: 'IUp'
            })
        }else if (pricePerUnit === 0 || isNaN(pricePerUnit)) {
            toast.error("Please Provide price per unit..", {
                id: 'Is'
            })
        }else if (supplier === '') {
            toast.error("Please Provide supplier..", {
                id: 'Is'
            })
        }
        else if (manufactureDate === '') {
            toast.error("Please Provide manufacture date..", {
                id: 'Is'
            })
        }
        else if (expiryDate === '') {
            toast.error("Please Provide expiry date..", {
                id: 'Is'
            })
        }
        else if (new Date(expiryDate) < new Date(manufactureDate)) toast.error("expiry Date must be after manufacture Date.");

       else if ( itemName !== '' && description !== '' && category !== '' && quantity !== '' && unit !== ''  && pricePerUnit !== '' && supplier !== '' && manufactureDate !== '' && expiryDate !== '') {
        
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
        
            axios.post("http://localhost:8040/inventory/add",newInventory).then(()=>{
                toast.success("Successfully Added");
                navigate('/inventory');
            }).catch(()=>{
                toast.error("Something Went Wrong");
            })

            setItemName('');
            setDescription('');
            setCategory('');
            setQuantity('');
            setUnit('');
            setPricePerUnit('');
            setSupplier('');
            setManufactureDate('');
            setExpiryDate('');
        }

    }

    return (
        <div style={{background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)",
        minHeight: "100vh",}}>
        <div className="form-style-5"> 
        <form onSubmit={sendData} >
            <div className="container"> <br/>
            <center><h1>Add Inventory</h1></center>
            <br></br><br></br>
            <div></div>

            <div className="form-group row">
                <label htmlFor="itemName" className="col-sm-2 col-form-label">Item Name</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" placeholder='Enter Item Name' onChange={(e)=>{
                    setItemName(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-8">
                <input type="text" className="form-control"  placeholder="Enter the description" onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
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
                <input type="text" className="form-control"  placeholder="Enter the Quantity" onChange={(e)=>{
                    setQuantity(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                            <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="pieces">pieces</option>
                                    <option value="packs">packs</option>
                                    <option value="liters">liters</option>
                                    <option value="boxes">boxes</option>
                                    <option value="units">units</option>
                                    <option value="bottles">bottles</option>                                </select>
                            </div>
                        </div>
                        <br />

            <div className="form-group row">
                <label htmlFor="pricePerUnit" className="col-sm-2 col-form-label">Price Per Unit</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter Price Per Unit" onChange={(e)=>{
                    setPricePerUnit(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="supplier" className="col-sm-2 col-form-label">Supplier</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter supplier" onChange={(e)=>{
                    setSupplier(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="manufactureDate" className="col-sm-2 col-form-label">Manufacture Date</label>
                <div className="col-sm-8">
                <input type="date" className="form-control" placeholder="Enter the Manufacture Date" onChange={(e)=>{
                    setManufactureDate(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="expiryDate" className="col-sm-2 col-form-label">Expiry Date</label>
                <div className="col-sm-8">
                <input type="date" className="form-control" placeholder="Enter the Expiry Date" onChange={(e)=>{
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

    )
}

export default AddInventory;