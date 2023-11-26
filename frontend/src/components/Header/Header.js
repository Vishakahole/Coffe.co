import React from 'react'
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { NavLink} from 'react-router-dom'
import "./Header.css"


const Header = () => {
  
  return (
      <Navbar >
        <Navbar.Brand href="/">Coffee.co</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ml-auto'>
          <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/login">Login</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/register"><Button variant="light">Signup</Button></NavLink></Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    // <div className="container-fluid p-0 nav-bar">
    //   <nav className="navbar navbar-expand-lg bg-none navbar-dark py-3">
    //     <NavLink to="/" className="navbar-brand px-lg-4 m-0">
    //       <h1 className="m-0 display-4 text-uppercase text-white">KOPPEE</h1>
    //     </NavLink> 
    //     <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
    //       <div className="navbar-nav ml-auto p-4">
    //         <NavLink to="/" className="nav-item nav-link active">Home</NavLink> 
    //         <NavLink to="/about" className="nav-item nav-link">About</NavLink> 
    //         <NavLink to="/login" className="nav-item nav-link">Login</NavLink> 
    //         <NavLink to="/register" className="nav-item nav-link">Sign up</NavLink> 
    //       </div>
    //     </div>
    //   </nav>
    // </div>
    

  )
}



export default Header;
