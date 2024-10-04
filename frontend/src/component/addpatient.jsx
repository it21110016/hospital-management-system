import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddPatient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [illness, setIllness] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [treatmentName, setTreatmentName] = useState('');
    const [status, setStatus] = useState('Ongoing'); // Default status
    const [startDate, setStartDate] = useState('');
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
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid Email address.");
            return;
        }
        if (!address.trim()) {
            toast.error("Address is required.");
            return;
        }
        if (!illness.trim()) {
            toast.error("Illness is required.");
            return;
        }
        if (!doctorName.trim()) {
            toast.error("Doctor Name is required.");
            return;
        }
        if (!treatmentName.trim()) {
            toast.error("Treatment Name is required.");
            return;
        }
        if (!startDate) {
            toast.error("Start Date is required.");
            return;
        }
        if (endDate && new Date(endDate) < new Date(startDate)) {
            toast.error("End Date must be after Start Date.");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('contactNumber', contactNumber);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('illness', illness);
        formData.append('doctorName', doctorName);
        formData.append('treatmentName', treatmentName);
        formData.append('status', status);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        if (picture) {
            formData.append('picture', picture);
        }

        axios.post("http://localhost:8040/patient/add", formData)
            .then(() => {
                toast.success("Patient added successfully!");
                setTimeout(() => {
                    window.location.replace('/patients');
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
                        <center><h1>Add Patient</h1></center>
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
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    placeholder="Enter Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="illness" className="col-sm-2 col-form-label">Illness</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Illness"
                                    value={illness}
                                    onChange={(e) => setIllness(e.target.value)}
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
                                    placeholder="Enter Doctor Name"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
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
                                    placeholder="Enter Treatment Name"
                                    value={treatmentName}
                                    onChange={(e) => setTreatmentName(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Discontinued">Discontinued</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="startDate" className="col-sm-2 col-form-label">Start Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
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
                        {/* <div className="form-group row">
                            <label htmlFor="picture" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div> */}
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
