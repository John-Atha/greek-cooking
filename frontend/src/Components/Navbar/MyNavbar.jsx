import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MyNavbar(props) {
    return (
        <Navbar bg="success" expand="sm" fixed='top'>
            <Navbar.Brand href="/">Greeek Cooking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/favourites">My Favourites</Nav.Link>
                <Nav.Link href="/my">My recipes</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;
