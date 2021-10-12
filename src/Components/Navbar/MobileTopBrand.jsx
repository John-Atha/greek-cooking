import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { base } from '../../base';

function MobileTopBrand(props) {

    const [userId, setUserId] = useState(props.userId);
    const removeCookie = useCookies(['token'])[2];
    const [showingModal, setShowingModal] = useState(false);

    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    const logout = () => {
        removeCookie('token', { path: '/' });
        setTimeout(() => {window.location.reload()}, 200);
    }

    return (
        <Navbar bg="success" fixed='top'>
            <Navbar.Brand href={`${base}/`}>Greek Cooking</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
                {!userId &&
                    <Nav.Link href={`${base}/login`}>Login</Nav.Link>
                }
                {userId &&
                    <Nav.Link onClick={()=>setShowingModal(true)}>
                        Logout
                    </Nav.Link>
                }
            </Nav>
            </Navbar.Collapse>
            {showingModal &&
                <Modal.Dialog style={{'position': 'fixed', 'width': '350px', 'top': '100px', 'left': '50vw', 'marginLeft': '-175px'}}>
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

export default MobileTopBrand;
