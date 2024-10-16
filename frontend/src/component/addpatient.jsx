import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddPatient = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        age: '',
        gender: '',
        contactNumber: '',
        address: '',
        illness: '',
        doctorName: '',
        treatmentName: '',
        status: 'Normal',
        startDate: '',
        endDate: '',
        emergencyContact: {
            name: '',
            phone: '',
            email: '',
            relation: ''
        }
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested object updates
        if (name.startsWith('emergencyContact.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                emergencyContact: { ...formData.emergencyContact, [field]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation checks
        const errors = validateFormData(formData);
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            setLoading(false);
            return;
        }

        const patientData = {
            ...formData,
            emergencyContact: formData.emergencyContact // Keep it as an object
        };
        
        try {
            await axios.post("http://localhost:8040/patient/add", patientData);
            toast.success("Patient added successfully!");
            setTimeout(() => {
                window.location.replace('/patients');
            }, 1000);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const validateFormData = (data) => {
        const errors = [];
        if (!data.firstName.trim()) errors.push("First Name is required.");
        else if (!data.age || isNaN(data.age) || data.age <= 0) errors.push("Please enter a valid Age.");
        else if (!data.gender) errors.push("Gender is required.");
        else if (!data.contactNumber.trim() || !/^\d{10}$/.test(data.contactNumber)) errors.push("Please enter a valid 10-digit Contact Number.");
        else if (!data.address.trim()) errors.push("Address is required.");
        else if (!data.illness.trim()) errors.push("Illness is required.");
        else if (!data.doctorName.trim()) errors.push("Doctor Name is required.");
        else if (!data.treatmentName.trim()) errors.push("Treatment Name is required.");
        else if (!data.startDate) errors.push("Start Date is required.");
        else if (!data.endDate) errors.push("End Date is required.");
        else if (new Date(data.endDate) < new Date(data.startDate)) errors.push("End Date must be after Start Date.");
        else if (!data.emergencyContact.name.trim()) errors.push("Emergency Contact Name is required.");
        else if (!data.emergencyContact.phone.trim() || !/^\d{10}$/.test(data.emergencyContact.phone)) errors.push("Please enter a valid 10-digit Emergency Contact Phone Number.");
        else if (!data.emergencyContact.email.trim() || !/^\S+@\S+\.\S+$/.test(data.emergencyContact.email)) errors.push("Please enter a valid Emergency Contact Email address.");
        else if (!data.emergencyContact.relation.trim()) errors.push("Emergency Contact Relation is required.");
        return errors;
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
                        <center><h1>Add Patient</h1></center>
                        <br /><br />
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name='firstName'
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name='age'
                                    className="form-control"
                                    placeholder="Enter Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleChange}
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
                                    name='contactNumber'
                                    placeholder="Enter Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="form-group row">
                            <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='address'
                                    placeholder="Enter Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="illness" className="col-sm-2 col-form-label">Illness</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name='illness'
                                    className="form-control"
                                    placeholder="Enter Illness"
                                    value={formData.illness}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="doctorName" className="col-sm-2 col-form-label">Doctor Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='doctorName'
                                    placeholder="Enter Doctor Name"
                                    value={formData.doctorName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="treatmentName" className="col-sm-2 col-form-label">Treatment Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='treatmentName'
                                    placeholder="Enter Treatment Name"
                                    value={formData.treatmentName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    name='status'
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                <option value="Normal">Normal</option>
                                <option value="Admitted">Admitted</option>
                                <option value="Discharged">Discharged</option>
                                <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="startDate" className="col-sm-2 col-form-label">Start Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name='startDate'
                                    className="form-control"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name='endDate'
                                    className="form-control"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <center><h4>Emergency Contact Details</h4></center>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="emergencyContact.name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="emergencyContact.name"
                                    className="form-control"
                                    placeholder="Enter Emergency Contact Name"
                                    value={formData.emergencyContact.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="emergencyContact.phone" className="col-sm-2 col-form-label">Phone</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="emergencyContact.phone"
                                    className="form-control"
                                    placeholder="Enter Emergency Contact Phone"
                                    value={formData.emergencyContact.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="emergencyContact.email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    name="emergencyContact.email"
                                    className="form-control"
                                    placeholder="Enter Emergency Contact Email"
                                    value={formData.emergencyContact.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="emergencyContact.relation" className="col-sm-2 col-form-label">Relation</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="emergencyContact.relation"
                                    className="form-control"
                                    placeholder="Enter Emergency Contact Relation"
                                    value={formData.emergencyContact.relation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <center><button type="submit" className="btn btn-secondary">Submit</button></center>
                        <br />
                        <Link to="/patients">
                            <button type="button" className="btn btn-danger">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
