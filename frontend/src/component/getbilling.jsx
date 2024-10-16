import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function GetBilling() {
    const [billing, setBilling] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch billing details by ID
    const getBillingDetails = () => {
        axios.get(`http://localhost:8040/billing/get/${id}`)
            .then((res) => {
                const billingData = res.data; // Adjust based on actual response structure
                console.log(res.data);
                setBilling(res.data);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getBillingDetails();
    }, [id]);

    // Delete billing record
    const deleteBilling = () => {
        if (window.confirm("Are you sure you want to delete this bill?")) {
            axios.delete(`http://localhost:8040/billing/delete/${id}`)
                .then(() => {
                    toast.success("Bill deleted successfully.");
                    setTimeout(() => {
                        window.location.replace('/billing');
                      }, 1000);
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    if (!billing) {
        return <p>Loading...</p>;
    }

    const { firstName, lastName, age, gender,  treatmentType,  treatmentCost, treatmentType1,  treatmentCost1, treatmentType2,  treatmentCost2, totalCost, picture,  endDate,  contactNumber, } = billing;

    return (
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px", minHeight: "100vh" }}>
            <center>
                <h2>Bill Details</h2>
                <div className="card" style={{ maxWidth: "600px", margin: "20px auto", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                    <img
                        src={`http://localhost:8040/UploadImage/Billing/${picture}`}
                        alt={`${firstName} ${lastName}`}
                        style={{ width: '100%', height: 'auto', borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                    />
                    <div className="card-body" style={{ padding: "20px" }}>
                        <p className="card-text"><strong>Name:</strong> {firstName} {lastName}</p>
                        <p className="card-text"><strong>Age:</strong> {age}</p>
                        <p className="card-text"><strong>Gender:</strong> {gender}</p>
                        <p className="card-text"><strong>Treatment:</strong> {treatmentType}</p>
                        <p className="card-text"><strong>Treatment Cost:</strong> {treatmentCost}</p>
                        <p className="card-text"><strong>Treatment 1:</strong> {treatmentType1}</p>
                        <p className="card-text"><strong>Treatment Cost:</strong> {treatmentCost1}</p>
                        <p className="card-text"><strong>Treatment 2:</strong> {treatmentType2}</p>
                        <p className="card-text"><strong>Treatment Cost:</strong> {treatmentCost2}</p>
                        <p className="card-text"><strong>Total Cost:</strong> {totalCost}</p>
                        {endDate && <p className="card-text"><strong>Discharged Date:</strong> {new Date(endDate).toLocaleDateString()}</p>}
                        <p className="card-text"><strong>Contact Number:</strong> {contactNumber}</p>
                    </div>
                    <div className="card-body" style={{ textAlign: "center", padding: "20px" }}>
                        <Link to={`/updatebilling/${id}`} className="btn btn-warning" style={{ marginRight: "10px" }}>Update</Link>
                        <button className="btn btn-danger" onClick={deleteBilling}>Delete</button>
                    </div>
                </div>
            </center>
            <br />
            <center>
                <Link to="/billing">
                    <button className="btn btn-dark">Back</button>
                </Link>
            </center>
            <br />
        </div>
    );
}

export default GetBilling;
