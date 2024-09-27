import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function UpdatePharmacy() {
    const [order, setOrder] = useState({
        drugId: '',
        drugName: '',
        category: '',
        storeBox: '',
        sellingPrice: '',
        quantity: '',
        company: '',
        effects: '',
        expireDate: '',
        
    });
    // const [pictureFile, setPictureFile] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch order details by ID
    const getOrder = () => {
        axios.get(`http://localhost:8040/pharmacy/get/${id}`)
            .then((res) => {
                const orderData = res.data;
                setOrder({
                    ...orderData,
                    expireDate: orderData.expireDate ? orderData.expireDate.split('T')[0] : '',
                    
                });
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        getOrder();
    }, [id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Send data as JSON since you are not uploading files
        axios.put(`http://localhost:8040/pharmacy/update/${id}`, order)
            .then(() => {
                toast.success('Order updated successfully');
                setTimeout(() => {
                    window.location.replace('/pharmacy');
                }, 1000);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || err.message); // Better error handling
            });
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value  // Update state for the specific input field
        }));
    };
    

    // Handle file change
    // const handleFileChange = (e) => {
    //     setPictureFile(e.target.files[0]);
    // };

    return (
        <div style={{ background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)", minHeight: "100vh", padding: "20px" }}>
            <div className="container">
                <center>
                    <h1>Update Order</h1>
                </center>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="form-group row">
                            <label htmlFor="drugId" className="col-sm-2 col-form-label">Drug Id</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="drugId"
                                    className="form-control"
                                    placeholder="Enter drug Id"
                                    value={order.drugId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="drugName" className="col-sm-2 col-form-label">Drug Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    name="drugName"
                                    className="form-control"
                                    placeholder="Enter drug Name"
                                    value={order.drugName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="sellingPrice" className="col-sm-2 col-form-label">Selling Price</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    name="sellingPrice"
                                    className="form-control"
                                    placeholder="Enter selling Price"
                                    value={order.sellingPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                     name="category"
                                    value={order.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Analgesics">Analgesics</option>
                                    <option value="Antiacids">Antiacids</option>
                                    <option value="Antipyretics">Antipyretics</option>
                                    <option value="Antivirals">Antivirals</option>
                                    <option value="Barbiturates">Barbiturates</option>
                                    <option value="Cytotoxics">Cytotoxics</option>
                                    <option value="Diuretics">Diuretics</option>
                                    <option value="Hormones">Hormones</option>
                                    <option value="Laxatives">Laxatives</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="storeBox" className="col-sm-2 col-form-label">Store Box</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={order.storeBox}
                                    name="storeBox"
                                    onChange={handleChange}
                                >
                                    <option value="">Select StoreBox</option>
                                    <option value="Box - A1">Box - A1</option>
                                    <option value="Box - A2">Box - A2</option>
                                    <option value="Box - B1">Box - B1</option>
                                    <option value="Box - A2">Box - A2</option>
                                    <option value="Box - C1">Box - C1</option>
                                    <option value="Box - C2">Box - C2</option>
                                    <option value="Box - D1">Box - D1</option>
                                    <option value="Box - D2">Box - D2</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Quantity"
                                    name="quantity"
                                    value={order.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="company" className="col-sm-2 col-form-label">Company</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    name="company"
                                    value={order.company}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Company</option>
                                    <option value="Johnson & Johnson">Johnson & Johnson</option>
                                    <option value="Pfizer">Pfizer</option>
                                    <option value="Merk $ Co.">Merk $ Co.</option>
                                    <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                                    <option value="Takeda">Takeda</option>
                                    <option value="Shanghai Pharmaceuticals Holding">Shanghai Pharmaceuticals Holding</option>
                                    <option value="AbbVie">AbbVie</option>
                                    <option value="Sanofi">Sanofi</option>
                                    <option value="Novartis">Novartis</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label htmlFor="effects" className="col-sm-2 col-form-label">Effects</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-control"
                                    value={order.effects}
                                    name="effects"
                                    onChange={handleChange}
                                >
                                    <option value="">Select Effects</option>
                                    <option value="headache">headache</option>
                                    <option value="muscle pain">muscle pain</option>
                                    <option value="chills">chills</option>
                                    <option value="Rash">Rash</option>
                                    <option value="Hives">Hives</option>
                                    <option value="vomiting">vomiting</option>
                                    <option value="dizziness">dizziness</option>
                                    <option value="weight gain">weight gain</option>
                                </select>
                            </div>
                        </div>
                        <br />
                       
                        <div className="form-group row">
                            <label htmlFor="expireDate" className="col-sm-2 col-form-label">Expire Date</label>
                            <div className="col-sm-8">
                                <input
                                    type="date"
                                    name="expireDate"
                                    className="form-control"
                                    value={order.expireDate}
                                    onChange={handleChange}
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
                        </div>
                        <br /> */}
                        <center><button type="submit" className="btn btn-secondary">Submit</button></center>
                        <br />
                        <Link to="/pharmacy">
                            <button type="button" className="btn btn-danger">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePharmacy;
