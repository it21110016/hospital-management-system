import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function AllInventory(){

    const [inventories, setInventory] = useState([]);

    useEffect(()=>{
        function getInventory(){
        axios.get("http://localhost:8040/inventory/get").then((res)=>{
            setInventory(res.data);
            console.log(res.data.payload);
        }).catch((err)=>{
            alert(err.message);
        })
        }
        getInventory();
    },[])

    
    //serach 
    
    const [serQuary,setSerQuary]=useState("");

    function searchIncome(event){
          setSerQuary(event.target.value);
    }
  
    const deleteDataC = (e) =>{
        var result = window.confirm("Are you sure you want to delete this item?");
      if(result == true){
          axios.delete(`http://localhost:8040/inventory/delete/${e._id}`).then((res)=>{
                // alert("Deleted");
                window.location.reload();
          }).catch(e =>{
              
          })
      }else{
        
      }
    
    }

    return (
       
        <div style={{ backgroundSize:"container" , backgroundColor:"#e9f4f8"}}> <br></br> 
                <div style={{width: '90%', display: 'flex', justifyContent: 'flex-end'}} className="no-print">
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
                    {/* You can add any other elements here, if needed */}
                    </div>

            <center>


            <h2>Inventories Details </h2></center>
            
            
                <div>
                    <div style={{ padding: '30px'}} className="no-print">
                    <Link to="/inventory/add">
                     <button type="button2" class="btn btn-info"> Add </button>
                    </Link>
                    </div>
                <center>
                    
                <table class="table table-bordered table-hover table-primary">
                    <thead >
                        <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Price Per Unit</th>
                        <th scope="col">Supplier</th>
                        <th scope="col" className="no-print">Update</th>
                        <th scope="col" className="no-print">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {inventories.filter( e => 
                        e.itemName.toLowerCase().includes(serQuary) ||
                        e.category.toLowerCase().includes(serQuary))
                    .map(inventory => ( 
                    
    
                        <tr>
                        <td>{inventory.itemName}</td>
                        <td>{inventory.category}</td>
                        <td>{inventory.quantity}</td>
                        <td>{inventory.unit}</td>
                        <td>{inventory.pricePerUnit}</td>
                        <td>{inventory.supplier}</td>
                        <td className="no-print"><Link to={"/inventory/update/"+inventory._id} className="btn btn-success">Update</Link></td>
                        <td className="no-print"><button className="btn btn-danger"  onClick={() => {deleteDataC(inventory)}}>Delete</button></td>
                        </tr> 
                        
                        ))}
                    </tbody>
                    </table>
                    </center>
                    <br></br>
                </div>
                    
           
                <center className="no-print">
                <Button onClick={() => { window.print(); }} variant="outline-success">Generate Report</Button>
            </center> <br></br><br></br>
        </div>
  );
}

