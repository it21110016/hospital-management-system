import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Billing() {
    const [billing, setBilling] = useState([]);
    const [serQuary, setSerQuary] = useState("");

    useEffect(() => {
        function getBilling() {
            axios.get("http://localhost:8040/billing/get")
                .then((res) => {
                    setBilling(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getBilling();
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
                <h2>Billing and Accounting</h2>
            </center>

            <div style={{ padding: '30px' }} className="no-print">
                <Link to="/addBilling">
                    <Button variant="info">Add Bill</Button>
                </Link>
            </div>

            <center>
                <Table striped bordered hover style={{ width: '90%' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Main Treatment</th>
                            <th>Total Cost</th>
                            <th>Discharged Date</th>
                            <th className="no-print">Actions</th> {/* Hide actions in print */}
                        </tr>
                    </thead>
                    <tbody>
                        {billing
                            .filter(billing =>
                                billing.firstName.toLowerCase().includes(serQuary.toLowerCase())
                                // billing.lastName.toLowerCase().includes(serQuary.toLowerCase()) ||
                                // billing.illness.toLowerCase().includes(serQuary.toLowerCase()) ||
                                // billing.doctorName.toLowerCase().includes(serQuary.toLowerCase())
                            )
                            .map(billing => (
                                <tr key={billing._id}>
                                    <td>{billing.firstName}</td>
                                    <td>{billing.age}</td>
                                    <td>{billing.gender}</td>
                                    <td>{billing.treatmentType}</td>
                                    <td>{billing.totalCost}</td>
                                    <td>{billing.endDate.split('T')[0]}</td>
                                    
                                    {/* <td>
                                        {billing.picture ? (
                                            <img
                                                src={`http://localhost:8040/UploadImage/Billing/${billing.picture}`}
                                                alt={billing.firstName}
                                                style={{ width: '100px', height: '100px' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td> */}
                                    <td className="no-print">
                                        <Link to={`/getBilling/${billing._id}`} className="btn btn-outline-dark">More Details</Link>
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
