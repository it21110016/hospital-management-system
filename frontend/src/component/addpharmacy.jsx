import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddPharmacy = () => {
    const [drugId, setDrugId] = useState('');
    const [drugName, setDrugName] = useState('');
    const [category, setCategory] = useState('');
    const [storeBox, setStoreBox] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [company, setCompany] = useState('');
    const [effects, setEffects] = useState('');
    const [expireDate, setExpireDate] = useState('');
    // const [treatmentName, setTreatmentName] = useState('');
    // const [status, setStatus] = useState('Ongoing'); // Default status
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [picture, setPicture] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            drugId,
            drugName,
            category,
            storeBox,
            sellingPrice,
            quantity,
            company,
            effects,
            expireDate
        };
    
        axios.post("http://localhost:8040/pharmacy/add", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response); 
            toast.success("Order added successfully!");
            setTimeout(() => {
                window.location.replace('/pharmacy');
            }, 1000);
        })
        .catch((error) => {
            console.error("Error: ", error.response ? error.response.data : error.message); 
            toast.error("Something went wrong.");
        });
    };
    
    

    const handleFileChange = (e) => {
        setPicture(e.target.files[0]);
    };

    return (
        <div style={{
            background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)",
            minHeight: "100vh",
        }}>
            <div className="form-style-5">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <br />
                        <center><h1>Add Order</h1></center>
                        <br /><br />
                        <div className="form-group row">
                            <label htmlFor="drugId" className="col-sm-2 col-form-label">Drug Id</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter drug Id"
                                    value={drugId}
                                    onChange={(e) => setDrugId(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="drugName" className="col-sm-2 col-form-label">Drug Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter drug Name"
                                    value={drugName}
                                    onChange={(e) => setDrugName(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="sellingPrice" className="col-sm-2 col-form-label">Selling Price</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter selling Price"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Analgesics">Analgesics</option>
                                    <option value="Antiacids">Antiacids</option>
                                    <option value="Antipyretics">Antipyretics</option>
                                    <option value="Antivirals">Antivirals</option>
                                    <option value="Barbiturates">Barbiturates</option>
                                    <option value="Cytotoxics">Cytotoxics</option>
                                    <option value="Diuretics">Diuretics</option>
                                    <option value="Hormones">Hormones</option>
                                    <option value="Laxatives">Laxatives</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="storeBox" className="col-sm-2 col-form-label">Store Box</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={storeBox}
                                    onChange={(e) => setStoreBox(e.target.value)}
                                >
                                    <option value="">Select StoreBox</option>
                                    <option value="Box - A1">Box - A1</option>
                                    <option value="Box - A2">Box - A2</option>
                                    <option value="Box - B1">Box - B1</option>
                                    <option value="Box - A2">Box - A2</option>
                                    <option value="Box - C1">Box - C1</option>
                                    <option value="Box - C2">Box - C2</option>
                                    <option value="Box - D1">Box - D1</option>
                                    <option value="Box - D2">Box - D2</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="company" className="col-sm-2 col-form-label">Company</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                >
                                    <option value="">Select Company</option>
                                    <option value="Johnson & Johnson">Johnson & Johnson</option>
                                    <option value="Pfizer">Pfizer</option>
                                    <option value="Merk $ Co.">Merk $ Co.</option>
                                    <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                                    <option value="Takeda">Takeda</option>
                                    <option value="Shanghai Pharmaceuticals Holding">Shanghai Pharmaceuticals Holding</option>
                                    <option value="AbbVie">AbbVie</option>
                                    <option value="Sanofi">Sanofi</option>
                                    <option value="Novartis">Novartis</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="effects" className="col-sm-2 col-form-label">Effects</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={effects}
                                    onChange={(e) => setEffects(e.target.value)}
                                >
                                    <option value="">Select Effects</option>
                                    <option value="headache">headache</option>
                                    <option value="muscle pain">muscle pain</option>
                                    <option value="chills">chills</option>
                                    <option value="Rash">Rash</option>
                                    <option value="Hives">Hives</option>
                                    <option value="vomiting">vomiting</option>
                                    <option value="dizziness">dizziness</option>
                                    <option value="weight gain">weight gain</option>
                                </select>
                            </div>
                        </div>
                        <br />
                       
                        <div className="form-group row">
                            <label htmlFor="expireDate" className="col-sm-2 col-form-label">Expire Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={expireDate}
                                    onChange={(e) => setExpireDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        
                        <div className="form-group row">
                            <label htmlFor="picture" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <br />
                        <center><button type="submit" className="btn btn-secondary">Submit</button></center>
                        <br />
                        <Link to="/pharmacy">
                            <button type="button" className="btn btn-danger">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPharmacy;
