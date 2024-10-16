import React, {useState} from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddAttendance(){

    const [user_id, setUserId] = useState("");
    const [attendance, setAttendance] = useState("");
    const [inTime, setInTime] = useState("");
    const [outTime, setOutTime] = useState("");
    const [details, setDetails] = useState("");
    const [total_hours, setTotalHours] = useState("");
    const [salary, setSalary] = useState(0);

    const navigate = useNavigate();

    function sendData(e){

        e.preventDefault();
        if (user_id === '') {
            toast.error("Please Choose User ID..", {
                id: 'name'
            })
        }else if (attendance === '') {
            toast.error("Please Choose Attendance..", {
                id: 'name'
            })
        }else if (inTime === '') {
            toast.error("Please Choose In Time..", {
                id: 'name'
            })
        }else if (outTime === '') {
            toast.error("Please Choose Out Time..", {
                id: 'name'
            })
        }else if (new Date(`1970-01-01T${inTime}:00`) >= new Date(`1970-01-01T${outTime}:00`)) {
            toast.error("In Time should be less than Out Time", {
                id: 'name'
            })
        }else if (details === '') {
            toast.error("Please Choose Details..", {
                id: 'name'
            })
        }else if (total_hours === '') {
            toast.error("Please Choose Total Hours..", {
                id: 'name'
            })
        }else if(user_id !== '' && attendance !== '' && inTime !== '' && outTime !== '' &&  details !== '' && total_hours !== ''){
        
        const newAttendace = {
            user_id, 
            attendance,
            inTime,
            outTime,
            details,
            total_hours,
            salary
        }
        console.log(newAttendace)
        axios.post("http://localhost:8040/attendance/add",newAttendace).then(() => {
            toast.success("Success");
            navigate('/allAttendace');

        }).catch((err) => {
            toast.success("UnSuccess");
        })

        setUserId('')
        setAttendance('')
        setInTime('')
        setOutTime('')
        setDetails('')
        setTotalHours('')
    }
}

// Function to update salary based on total hours
function handleTotalHoursChange(e) {
    const selectedHours = e.target.value;
    setTotalHours(selectedHours);

    // Calculate salary based on total hours
    let calculatedSalary = 0;
    switch (selectedHours) {
      case "1":
        calculatedSalary = 500;
        break;
      case "2":
        calculatedSalary = 750;
        break;
      case "3":
        calculatedSalary = 800;
        break;
      case "4":
        calculatedSalary = 1000;
        break;
      case "5":
        calculatedSalary = 1500;
        break;
      case "6":
        calculatedSalary = 1800;
        break;
      case "7":
        calculatedSalary = 2000;
        break;
      case "8":
        calculatedSalary = 2200;
        break;
      default:
        calculatedSalary = 0;
    }
    setSalary(calculatedSalary);
  }

    return (
        <div style={{background: "linear-gradient(to bottom, #ffffff, #add8e6, #378cab)",
        minHeight: "100vh",}}>
        <div className="form-style-5"> 
        <form onSubmit={sendData} >
            <div className="container"> <br/>
            <center><h1>Mark Attendance and Salary</h1></center>
            <br></br><br></br>
            <div></div>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">User ID</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" placeholder="Enter the User ID " onChange={(e) => setUserId(e.target.value)} />
                </div>
            </div><br/>

           

            <div className="form-group row">
                <label htmlFor="attendace" className="col-sm-2 col-form-label">Attendance</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter the Attendace " onChange={(e)=>{
                    setAttendance(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="inTime" className="col-sm-2 col-form-label">In Time</label>
                <div className="col-sm-8">
                <input type="time" className="form-control"  placeholder="Enter the In Time" onChange={(e)=>{
                    setInTime(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="outTime" className="col-sm-2 col-form-label">Out Time</label>
                <div className="col-sm-8">
                <input type="time" className="form-control" placeholder="Enter the Out Time" onChange={(e)=>{
                    setOutTime(e.target.value);
                }}/>
                </div>
            </div><br/>

            <div className="form-group row">
                <label htmlFor="detils" className="col-sm-2 col-form-label">Details</label>
                <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Enter the Details" onChange={(e)=>{
                    setDetails(e.target.value);
                }}/>
                </div>
            </div><br/>

           
            <div className="form-group row">
              <label htmlFor="hours" className="col-sm-2 col-form-label">
                Hours
              </label>
              <div className="col-sm-8">
                <select
                  value={total_hours}
                  onChange={handleTotalHoursChange}
                  className="form-control"
                >
                  <option value="">Select Hours</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
            <br />

            <div className="form-group row">
              <label htmlFor="salary" className="col-sm-2 col-form-label">
                Salary
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  value={salary}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>
            <br />


            <center><button type="submit" className="btn btn-dark" >Submit</button></center><br/>
            <Link to="/allAttendace">
                     <button type="button2" class="btn btn-outline-danger"> Back </button>
            </Link>
            </div>
            </form><br></br>
            </div>
            </div>
    )

}