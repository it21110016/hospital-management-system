import React from "react";
import logo from '../images/logo.jpeg';
import I1 from "../images/header.jpeg";

function Header() {

  const handleLogout = () => {
    // Clear the user's login status (e.g., remove the JWT token from localStorage)
    localStorage.removeItem('token');

    // Redirect the user to the login page
    window.location.href = "/";
  };

  return (
    <div style={{
      display: 'flex', backgroundColor: "white", justifyContent: 'space-between', backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 1.0, // Set the opacity of the image (0.0 to 1.0)
      filter: "brightness(90%)"
    }}>
      <img src={logo} width={"10%"} style={{ padding: '10px', marginLeft: '5%' }} />
      <nav class="navbar navbar-expand-lg navbar-light bg-white" style={{ "border-radius": "10px", width: "85%" }}>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav" style={{ marginLeft: "10%" }}>
            <p class="nav-item nav-link active" href="#" style={{ padding: '0 30px', color: 'white' }}>Home</p>
            {/* <a class="nav-item nav-link active" href="http://localhost:3002/" style={{ padding: '0 30px' , color: 'black' }}>Laboratory</a> */}
            {/* <a class="nav-item nav-link" href="http://localhost:3001" style={{ padding: '0 30px',color: 'black' }}>Phamacy</a> */}
            {/* <a class="nav-item nav-link " href="/contactus" style={{ padding: '0 30px' ,color: 'black' }}>Contcat Us</a> */}
            {/* <a class="nav-item nav-link" href="/#" style={{ padding: '0 30px', color: 'black' }}>About Us</a> */}
            {/* <a class="nav-item nav-link" href="/login" style={{ padding: '0 30px', color: 'black' }}>Staff Login</a> */}
            {localStorage.getItem('token') ? (
            
            <button class="nav-item nav-link" onClick={handleLogout} style={{ padding: '10px', marginLeft: '350%', color: 'white', backgroundColor: "#151E3D", "border-radius": "10px" }}>Log_out</button>
             
            ) : (
              
                <a class="nav-item nav-link" href="/login" style={{ padding: '10px', marginLeft: '350%', color: 'white', backgroundColor: "#151E3D", "border-radius": "10px" }}>Admin_Login</a>

             
            )}
            {/* <a class="nav-item nav-link" href="/login" style={{ padding: '10px', marginLeft: '350%', color: 'white', backgroundColor: "#151E3D", "border-radius": "10px" }}>Staff_Login</a> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header;