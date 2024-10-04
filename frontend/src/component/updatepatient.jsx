import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function UpdatePatient() {
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        status: '',
        illness: '',
        doctorName: '',
        treatmentName: '',
        picture: '',
        startDate: '',
        endDate: '',
        address: '',
        contactNumber: '',
        email: ''
    });
    const [pictureFile, setPictureFile] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch patient details by ID
    const getPatient = () => {
        axios.get(`http://localhost:8040/patient/get/${id}`)
            .then((res) => {
                const patientData = res.data;
                setPatient({
                    ...patientData,
                    startDate: patientData.startDate ? patientData.startDate.split('T')[0] : '',
                    endDate: patientData.endDate ? patientData.endDate.split('T')[0] : ''
                });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getPatient();
    }, [id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!patient.age || isNaN(patient.age) || patient.age <= 0) {
            toast.error("Please enter a valid Age.");
            return;
        }
        if (!patient.contactNumber.trim() || !/^\d{10}$/.test(patient.contactNumber)) {
            toast.error("Please enter a valid 10-digit Contact Number.");
            return;
        }
        if (!patient.email.trim() || !/^\S+@\S+\.\S+$/.test(patient.email)) {
            toast.error("Please enter a valid Email address.");
            return;
        }
        if (patient.endDate && new Date(patient.endDate) < new Date(patient.startDate)) {
            toast.error("End Date must be after Start Date.");
            return;
        }

        const formData = new FormData();
        Object.keys(patient).forEach(key => {
            formData.append(key, patient[key]);
        });
        if (pictureFile) {
            formData.append('picture', pictureFile);
        }

        axios.put(`http://localhost:8040/patient/update/${id}`, formData)
            .then(() => {
                toast.success('Patient updated successfully');
                setTimeout(() => {
                    window.location.replace('/patients');
                  }, 1000);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file change
    const handleFileChange = (e) => {
        setPictureFile(e.target.files[0]);
    };

    return (
        <div style={{ background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)", minHeight: "100vh", padding: "20px" }}>
            <div className="container">
                <center>
                    <h1>Update Patient</h1>
                </center>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="firstName" name="firstName" value={patient.firstName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="lastName" name="lastName" value={patient.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="age" name="age" value={patient.age} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10">
                            <select id="gender" name="gender" className="form-control" value={patient.gender} onChange={handleChange} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            {/* <input type="text" className="form-control" id="status" name="status" value={patient.status} onChange={handleChange} required /> */}
                        
                            <select id="status" name="status" className="form-control" value={patient.status} onChange={handleChange} required>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Discontinued">Discontinued</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    {/* enum: ['Ongoing', 'Completed', 'Discontinued'], */}

                    <div className="form-group row">
                        <label htmlFor="illness" className="col-sm-2 col-form-label">Illness</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="illness" name="illness" value={patient.illness} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="doctorName" className="col-sm-2 col-form-label">Doctor Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="doctorName" name="doctorName" value={patient.doctorName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="treatmentName" className="col-sm-2 col-form-label">Treatment Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="treatmentName" name="treatmentName" value={patient.treatmentName} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="startDate" className="col-sm-2 col-form-label">Start Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="startDate" name="startDate" value={patient.startDate} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control" id="endDate" name="endDate" value={patient.endDate} onChange={handleChange} />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="address" name="address" value={patient.address} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="contactNumber" className="col-sm-2 col-form-label">Contact Number</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={patient.contactNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" name="email" value={patient.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <br />

                    {/* <div className="form-group row">
                        <label htmlFor="picture" className="col-sm-2 col-form-label">Picture</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="picture" onChange={handleFileChange} />
                            {patient.picture && (
                                <img 
                                    src={patient.picture} 
                                    alt="Patient" 
                                    style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                                />
                            )}
                        </div>
                    </div> */}
                    <br />

                    <center>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </center>
                    <br />
                    <Link to="/patients">
                        <button type="button" className="btn btn-danger">Back</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default UpdatePatient;
