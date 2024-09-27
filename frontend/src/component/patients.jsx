import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [serQuary, setSerQuary] = useState("");

    useEffect(() => {
        function getPatients() {
            axios.get("http://localhost:8040/patient/get")
                .then((res) => {
                    setPatients(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getPatients();
    }, []);  // Empty dependency array to run only once on mount

    function searchIncome(event) {
        setSerQuary(event.target.value);
    }

    return (
        <div style={{ backgroundSize: "container", backgroundColor: "#e9f4f8" }}>
            <br />
            <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end' }} className="no-print">
                <input
                    onChange={searchIncome}
                    placeholder="Search....."
                    style={{
                        borderRadius: '5px',
                        padding: '10px',
                        border: 'none',
                        background: '#f2f2f2',
                        marginRight: '10px',
                        width: '200px',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                        fontSize: '16px',
                        color: '#333'
                    }}
                />
            </div>

            <center>
                <h2>Patients Management</h2>
            </center>

            <div style={{ padding: '30px' }} className="no-print">
                <Link to="/addPatient">
                    <Button variant="info">Add Patient</Button>
                </Link>
            </div>

            <center>
                <Table striped bordered hover style={{ width: '90%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Illness</th>
                            <th>Assigned Doctor</th>
                            <th>Admit Date</th>
                            <th>Treatments</th>
                            <th className="no-print">Actions</th> {/* Hide actions in print */}
                        </tr>
                    </thead>
                    <tbody>
                        {patients
                            .filter(patient =>
                                patient.firstName.toLowerCase().includes(serQuary.toLowerCase()) ||
                                patient.lastName.toLowerCase().includes(serQuary.toLowerCase()) ||
                                patient.illness.toLowerCase().includes(serQuary.toLowerCase()) ||
                                patient.doctorName.toLowerCase().includes(serQuary.toLowerCase())
                            )
                            .map(patient => (
                                <tr key={patient._id}>
                                    <td>{patient.firstName}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.illness}</td>
                                    <td>{patient.doctorName}</td>
                                    <td>{patient.startDate.split('T')[0]}</td>
                                    <td>{patient.treatmentName}</td>
                                    {/* <td>
                                        {patient.picture ? (
                                            <img
                                                src={`http://localhost:8040/UploadImage/Patients/${patient.picture}`}
                                                alt={patient.firstName}
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td> */}
                                    <td className="no-print">
                                        <Link to={`/getPatient/${patient._id}`} className="btn btn-outline-dark">More Details</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </center>

            <center className="no-print">
                <Button onClick={() => { window.print(); }} variant="outline-success">Generate Report</Button>
            </center>
            <br /><br />
        </div>
    );
}
