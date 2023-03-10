import logo from './logo.svg';

//React imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// styling
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import Home from './Pages/Home';
import About from './Pages/About';
import Episodes from './Pages/Episodes';
import EpisodeDetails from './Pages/EpisodeDetails';
import FindUs from './Pages/FindUs';

function App() {
  return (
     <div className="App">
      {/* nav bar */}
       <Navbar className='nav' expand="lg">
      <Container fluid className='nav'>
      {/* <img className='navlogo mx-3' src={logo} alt="NavLogo" /> */}
        <Navbar.Brand className='mx-3' href="/">Two Woodland Witches</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* links to pages */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/episodes">Episodes</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/findus">Find Us!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    {/* routes */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodeDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
