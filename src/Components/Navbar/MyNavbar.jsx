import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { createNotification } from '../../createNotification';
import search_icon from 'bootstrap-icons/icons/search.svg';
import heart_icon from 'bootstrap-icons/icons/heart.svg';
import food_icon from 'bootstrap-icons/icons/egg-fried.svg';
import person_icon from 'bootstrap-icons/icons/person-circle.svg';
import upload_icon from 'bootstrap-icons/icons/cloud-arrow-up.svg'
import home_icon from 'bootstrap-icons/icons/house.svg'
import { base } from '../../base';

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
            if (link==='profile') window.location.href = `${base}/users/${userId}`;
            else window.location.href = `${base}/${link}`;
        }
    }

    return (
        <Navbar bg="success" fixed={window.innerWidth>600 ? 'top' : 'bottom'}>
            {window.innerWidth>600 &&
                <Navbar.Brand href={`${base}/`}>Greek Cooking</Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{'fontSize': '1.1rem', 'margin': window.innerWidth<=600 ? 'auto': '0px'}}>
                {window.innerWidth<=600 &&
                    <Nav.Link href={`${base}/`}>
                        <img src={home_icon} alt='Home' style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                    </Nav.Link>
                }
                <Nav.Link href={`${base}/search`}>
                    <img src={search_icon} alt={window.innerWidth>600 ? '' : 'Search'} style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                    {window.innerWidth>600 &&
                        'Search'                
                    }
                </Nav.Link>

                <Nav.Link onClick={()=>navigate('favourites')}>
                    <img src={heart_icon} alt={window.innerWidth>600 ? '' : 'Favourites'} style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                    {window.innerWidth>600 &&
                        'My Favourites'                
                    }
                </Nav.Link>
                {window.innerWidth>600 &&
                    <Nav.Link onClick={()=>navigate('my')}>
                        <img src={food_icon} alt={window.innerWidth>600 ? '' : 'My recipes'} style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                            My recipes                
                    </Nav.Link>
                }
                <Nav.Link onClick={()=>navigate('upload')}>
                    <img src={upload_icon} alt={window.innerWidth>600 ? '' : 'Upload'} style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                    {window.innerWidth>600 &&
                        'Upload'                
                    }
                </Nav.Link>
                <Nav.Link onClick={()=>navigate('profile')}>
                    <img src={person_icon} alt={window.innerWidth>600 ? '' : 'Profile'} style={{'marginRight': window.innerWidth<=600 ? '0px' : '2px', 'width': window.innerWidth<=600 ? '8vw' : 'auto' }} />
                    {window.innerWidth>600 &&
                        'My profile'                
                    }
                </Nav.Link>

            </Nav>
            {window.innerWidth>600 && 
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
            }
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

export default MyNavbar;
