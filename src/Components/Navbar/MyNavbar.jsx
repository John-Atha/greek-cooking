import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { createNotification } from '../../createNotification';

function MyNavbar(props) {

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

    const navigate = (link) => {
        if (!userId) {
            createNotification('danger', 'Sorry', `You have to login to have a '${link} recipes' page.`)
        }
        else {
            if (link==='profile') window.location.href = `/users/${userId}`;
            else window.location.href = `/${link}`;
        }
    }

    return (
        <Navbar bg="success" expand="sm" fixed='top'>
            <Navbar.Brand href="/">Greeek Cooking</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link onClick={()=>navigate('favourites')}>My Favourites</Nav.Link>
                <Nav.Link onClick={()=>navigate('my')}>My recipes</Nav.Link>
                <Nav.Link onClick={()=>navigate('profile')}>My Profile</Nav.Link>
                <Nav.Link onClick={()=>navigate('upload')}>Upload</Nav.Link>
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
