import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';  // Import Modal from react-bootstrap

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [serQuary, setSerQuary] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

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

    // Handle Emergency button click
    function handleEmergencyClick(patient) {
        setSelectedPatient(patient);  // Set the selected patient
        setShowModal(true);  // Show confirmation modal
    }

    // Handle the confirmation of Emergency status change
    function confirmEmergencyStatus() {
        if (selectedPatient) {
            // Step 1: Update patient status to "Emergency"
            axios.put(`http://localhost:8040/patient/update/${selectedPatient._id}`, {
                ...selectedPatient,
                status: "Critical"
            })
            .then(() => {
                // Step 2: Send notifications after status update
                axios.put(`http://localhost:8040/patient/notification/${selectedPatient._id}`)
                .then(() => {
                    alert("Emergency notification sent successfully!");
    
                    // After successful update and notification, reload patients data and close the modal
                    setPatients(prevPatients => prevPatients.map(p =>
                        p._id === selectedPatient._id ? { ...p, status: "Emergency" } : p
                    ));
                    setShowModal(false);
                    window.location.reload();
                })
                .catch((err) => {
                    alert('Error sending emergency notification: ' + err.message);
                });
            })
            .catch((err) => {
                alert('Error updating patient status: ' + err.message);
            });
        }
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
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Illness</th>
                            <th>Assigned Doctor</th>
                            <th>Admit Date</th>
                            <th>Treatments</th>
                            <th>Status</th>
                            <th className="no-print">Actions</th> {/* Hide actions in print */}
                        </tr>
                    </thead>
                    <tbody>
                        {patients
                            .filter(patient =>
                                patient.firstName.toLowerCase().includes(serQuary.toLowerCase()) ||
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
                                    <td>{patient.status == 'Critical' ? (
                                        <span style={{ color: 'red' }}>{patient.status}</span>
                                    ) : patient.status}
                                    </td>
                                    <td className="no-print">
                                        <Link to={`/getPatient/${patient._id}`} className="btn btn-outline-dark">More Details</Link>
                                    </td>
                                    <td className="no-print">
                                        {patient.status !== 'Critical' ? (
                                            <Button variant="danger" onClick={() => handleEmergencyClick(patient)}>
                                                Emergency
                                            </Button>
                                        ) : ( <p></p> )
                                        }
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

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Emergency Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to change the status of patient {selectedPatient?.firstName} to "Critical"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmEmergencyStatus}>
                        Yes, Change Status
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}
