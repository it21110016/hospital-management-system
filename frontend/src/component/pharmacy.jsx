import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Pharmacy() {
    const [orders, setOrders] = useState([]);
    const [serQuary, setSerQuary] = useState("");

    useEffect(() => {
        function getOrder() {
            axios.get("http://localhost:8040/pharmacy/get")
                .then((res) => {
                    setOrders(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getOrder();
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
                <h2>Pharmacy Management</h2>
            </center>

            <div style={{ padding: '30px' }} className="no-print">
                <Link to="/addPharmacy">
                    <Button variant="info">Add Order</Button>
                </Link>
            </div>

            <center>
                <Table striped bordered hover style={{ width: '90%' }}>
                    <thead>
                        <tr>
                            <th>Drug Id</th>
                            <th>Drug Name</th>
                            <th>Category</th>
                            <th>Store Box</th>
                            <th>Selling Price</th>
                            <th>Quantity</th>
                            <th>company</th>
                            <th>Effects</th>
                            <th>Expire Date</th>
                            <th className="no-print">Actions</th> {/* Hide actions in print */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .filter(order =>
                                order.drugName.toLowerCase().includes(serQuary.toLowerCase())
                                // patient.lastName.toLowerCase().includes(serQuary.toLowerCase()) ||
                                // patient.illness.toLowerCase().includes(serQuary.toLowerCase()) ||
                                // patient.doctorName.toLowerCase().includes(serQuary.toLowerCase())
                            )
                            .map(order => (
                                <tr key={order._id}>
                                    <td>{order.drugId}</td>
                                    <td>{order.drugName}</td>
                                    <td>{order.category}</td>
                                    <td>{order.storeBox}</td>
                                    <td>{order.sellingPrice}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.company}</td>
                                    <td>{order.effects}</td>
                                    <td>{order.expireDate.split('T')[0]}</td>
                                    
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
                                        <Link to={`/getPharmacy/${order._id}`} className="btn btn-outline-dark">More Details</Link>
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
