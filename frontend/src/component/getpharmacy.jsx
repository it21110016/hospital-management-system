import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function GetPharmacy() {
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch order details by ID
    const getOtderDetails = () => {
        axios.get(`http://localhost:8040/pharmacy/get/${id}`)
            .then((res) => {
                const orderData = res.data; // Adjust based on actual response structure
                setOrder(orderData);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getOtderDetails();
    }, [id]);

    // Delete order record
    const deleteOrder = () => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            axios.delete(`http://localhost:8040/pharmacy/delete/${id}`)
                .then(() => {
                    toast.success("order record deleted successfully.");
                    setTimeout(() => {
                        window.location.replace('/pharmacy');
                    }, 1000);
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    if (!order) {
        return <p>Loading...</p>;
    }

    const { drugId,
        drugName,
        category,
        storeBox,
        sellingPrice,
        quantity,
        company,
        effects,
        expireDate } = order;

    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px", minHeight: "100vh" }}>
            <center>
                <h2>Order Details</h2>
                <div className="card" style={{ maxWidth: "600px", margin: "20px auto", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>

                    <div className="card-body" style={{ padding: "20px" }}>
                        <p className="card-text"><strong>Drug Id:</strong> {drugId}</p>
                        <p className="card-text"><strong>Name:</strong> {drugName}</p>
                        <p className="card-text"><strong>Category:</strong> {category}</p>
                        <p className="card-text"><strong>Store Box:</strong> {storeBox}</p>
                        <p className="card-text"><strong>Selling Price:</strong> {sellingPrice}</p>
                        <p className="card-text"><strong>Quantity:</strong> {quantity}</p>
                        <p className="card-text"><strong>Company:</strong> {company}</p>
                        <p className="card-text"><strong>Effects:</strong> {effects}</p>
                        <p className="card-text"><strong>Expire Date:</strong> {new Date(expireDate).toLocaleDateString()}</p>

                    </div>
                    <div className="card-body" style={{ textAlign: "center", padding: "20px" }}>
                        <Link to={`/pharmacy/${id}`} className="btn btn-warning" style={{ marginRight: "10px" }}>Update</Link>
                        <button className="btn btn-danger" onClick={deleteOrder}>Delete</button>
                    </div>
                </div>
            </center>
            <br />
            <center>
                <Link to="/pharmacy">
                    <button className="btn btn-dark">Back</button>
                </Link>
            </center>
            <br />
        </div>
    );
}

export default GetPharmacy;
