import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddBilling = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [treatmentType, setTreatmentType] = useState('');
    const [treatmentCost, setTreatmentCost] = useState('');
    const [treatmentType1, setTreatmentType1] = useState('');
    const [treatmentCost1, setTreatmentCost1] = useState('');
    const [treatmentType2, setTreatmentType2] = useState('');
    const [treatmentCost2, setTreatmentCost2] = useState('');
    const [endDate, setEndDate] = useState('');
    const [picture, setPicture] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!firstName.trim()) {
            toast.error("First Name is required.");
            return;
        }
        if (!lastName.trim()) {
            toast.error("Last Name is required.");
            return;
        }
        if (!age || isNaN(age) || age <= 0) {
            toast.error("Please enter a valid Age.");
            return;
        }
        if (!gender) {
            toast.error("Gender is required.");
            return;
        }
        if (!contactNumber.trim() || !/^\d{10}$/.test(contactNumber)) {
            toast.error("Please enter a valid 10-digit Contact Number.");
            return;
        }
        if (!treatmentType.trim()) {
            toast.error("Treatment Type is required.");
            return;
        }
        if (!treatmentCost || isNaN(treatmentCost) || treatmentCost <= 0) {
            toast.error("Treatment Cost is required.");
            return;
        }
        if (!endDate) {
            toast.error("Discharged date required");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('contactNumber', contactNumber);
        formData.append('treatmentType', treatmentType);
        formData.append('treatmentCost', treatmentCost);
        formData.append('treatmentType1', treatmentType1);
        formData.append('treatmentCost1', treatmentCost1);
        formData.append('treatmentType2', treatmentType2);
        formData.append('treatmentCost2', treatmentCost2);
        formData.append('totalCost', parseInt(treatmentCost) + parseInt(treatmentCost1) + parseInt(treatmentCost2));
        formData.append('endDate', endDate);
        if (picture) {
            formData.append('picture', picture);
        }

        axios.post("http://localhost:8040/billing/add", formData)
            .then(() => {
                toast.success("Bill added successfully!");
                setTimeout(() => {
                    window.location.replace('/billing');
                  }, 1000);
            })
            .catch(() => {
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
                        <center><h1>Add Bill</h1></center>
                        <br /><br />
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="contactNumber" className="col-sm-2 col-form-label">Contact Number</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Contact Number"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentType" className="col-sm-2 col-form-label">Treatment Type</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Type"
                                    value={treatmentType}
                                    onChange={(e) => setTreatmentType(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentCost" className="col-sm-2 col-form-label">Treatment Cost</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Cost"
                                    value={treatmentCost}
                                    onChange={(e) => setTreatmentCost(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentType1" className="col-sm-2 col-form-label">Other Treatments</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Type"
                                    value={treatmentType1}
                                    onChange={(e) => setTreatmentType1(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentCost1" className="col-sm-2 col-form-label">Treatment Cost</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Cost"
                                    value={treatmentCost1}
                                    onChange={(e) => setTreatmentCost1(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentType2" className="col-sm-2 col-form-label">Other Treatments</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Type"
                                    value={treatmentType2}
                                    onChange={(e) => setTreatmentType2(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentCost2" className="col-sm-2 col-form-label">Treatment Cost</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Treatment Cost"
                                    value={treatmentCost2}
                                    onChange={(e) => setTreatmentCost2(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentCost2" className="col-sm-2 col-form-label">Total Treatment Cost</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total Treatment Cost"
                                    value={Number(treatmentCost)+Number(treatmentCost1)+Number(treatmentCost2)}
                                    disabled
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="endDate" className="col-sm-2 col-form-label">Discharged Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
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
                        <Link to="/billing">
                            <button type="button" className="btn btn-danger">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBilling;
