import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

function MyNavbar(props) {

    const [userId, setUserId] = useState(props.userId);
    const [username, setUsername] = useState(props.username);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [showingModal, setShowingModal] = useState(false);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    const logout = () => {
        removeCookie('token', { path: '/' });
        setTimeout(() => {window.location.reload()}, 200);
    }

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
            <Nav>
                {!userId &&
                    <Nav.Link href='/login'>Login</Nav.Link>
                }
                {userId &&
                    <Nav.Link onClick={()=>setShowingModal(true)}>
                        Logout
                    </Nav.Link>
                }
            </Nav>
            </Navbar.Collapse>
            {showingModal &&
                <Modal.Dialog style={{'position': 'absolute', 'width': '350px', 'top': '100px', 'left': '50%', 'marginLeft': '-175px'}}>
                    <Modal.Header>
                        <Modal.Title>Logout</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to logout?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowingModal(false)}>No, don't logout</Button>
                        <Button variant="primary" onClick={logout}>Logout</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            }
        </Navbar>
    )
}

export default MyNavbar;
