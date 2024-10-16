import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function UpdateBilling() {
    const [billing, setBilling] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        treatmentType: '',
        treatmentCost: '',
        treatmentType1: '',
        treatmentCost1: '',
        treatmentType2: '',
        treatmentCost2: '',
        totalCost: '',
        picture: '',
        endDate: '',
        contactNumber: '',
    });
    const [pictureFile, setPictureFile] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch billing details by ID
    const getBilling = () => {
        axios.get(`http://localhost:8040/billing/get/${id}`)
            .then((res) => {
                const billingData = res.data;
                console.log(res.data);
                setBilling({
                    ...billingData,
                    startDate: billingData.startDate ? billingData.startDate.split('T')[0] : '',
                    endDate: billingData.endDate ? billingData.endDate.split('T')[0] : ''
                });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getBilling();
    }, [id]);

    // Calculate total cost based on the treatment costs
    const calculateTotalCost = () => {
        const cost1 = parseFloat(billing.treatmentCost) || 0;
        const cost2 = parseFloat(billing.treatmentCost1) || 0;
        const cost3 = parseFloat(billing.treatmentCost2) || 0;
        return (cost1 + cost2 + cost3).toFixed(2);  // Fixed to 2 decimal places
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!billing.age || isNaN(billing.age) || billing.age <= 0) {
            toast.error("Please enter a valid Age.");
            return;
        }
        if (!billing.contactNumber.trim() || !/^\d{10}$/.test(billing.contactNumber)) {
            toast.error("Please enter a valid 10-digit Contact Number.");
            return;
        }
        if (billing.endDate && new Date(billing.endDate) < new Date(billing.startDate)) {
            toast.error("End Date must be after Start Date.");
            return;
        }

        const formData = new FormData();
        Object.keys(billing).forEach(key => {
            formData.append(key, billing[key]);
        });
        if (pictureFile) {
            formData.append('picture', pictureFile);
        }

        axios.put(`http://localhost:8040/billing/update/${id}`, formData)
            .then(() => {
                toast.success('Bill updated successfully');
                setTimeout(() => {
                    window.location.replace('/billing');
                  }, 1000);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    // Handle input change
     const handleChange = (e) => {
        const { name, value } = e.target;
        setBilling(prevState => {
            const updatedBilling = {
                ...prevState,
                [name]: value,
            };
            // Recalculate total cost whenever any treatment cost is updated
            updatedBilling.totalCost = calculateTotalCost();
            return updatedBilling;
        });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setPictureFile(e.target.files[0]);
    };

    return (
        <div style={{ background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)", minHeight: "100vh", padding: "20px" }}>
            <div className="container">
                <center>
                    <h1>Update Bill</h1>
                </center>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="firstName" name="firstName" value={billing.firstName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="lastName" name="lastName" value={billing.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="age" name="age" value={billing.age} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10">
                            <select id="gender" name="gender" className="form-control" value={billing.gender} onChange={handleChange} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentType" className="col-sm-2 col-form-label">Treatment Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentType" name="treatmentType" value={billing.treatmentType} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentCost" className="col-sm-2 col-form-label">Treatment Cost</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentCost" name="treatmentCost" value={billing.treatmentCost} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentType1" className="col-sm-2 col-form-label">Treatment Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentType1" name="treatmentType1" value={billing.treatmentType1} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentCost1" className="col-sm-2 col-form-label">Treatment Cost</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentCost1" name="treatmentCost1" value={billing.treatmentCost1} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentType2" className="col-sm-2 col-form-label">Treatment Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentType2" name="treatmentType2" value={billing.treatmentType2} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentCost2" className="col-sm-2 col-form-label">Treatment Cost</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentCost2" name="treatmentCost2" value={billing.treatmentCost2} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="totalCost" className="col-sm-2 col-form-label">Total Cost</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="totalCost" name="totalCost" value={Number(billing.treatmentCost)+Number(billing.treatmentCost1)+Number(billing.treatmentCost2)} readOnly />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="endDate" name="endDate" value={billing.endDate} onChange={handleChange} />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="contactNumber" className="col-sm-2 col-form-label">Contact Number</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={billing.contactNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="picture" className="col-sm-2 col-form-label">Picture</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="picture" onChange={handleFileChange} />
                            {billing.picture && (
                                <img 
                                    src={billing.picture} 
                                    alt="Bill" 
                                    style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                                />
                            )}
                        </div>
                    </div>
                    <br />

                    <center>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </center>
                    <br />
                    <Link to="/billing">
                        <button type="button" className="btn btn-danger">Back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default UpdateBilling;
