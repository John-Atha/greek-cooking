import React, { useState } from 'react';
import { login } from '../../api/api';
import { Container, Success, Error } from './styles';
import { Form, Button, InputGroup } from 'react-bootstrap';
import person_icon from 'bootstrap-icons/icons/person.svg';
import lock_icon from 'bootstrap-icons/icons/lock.svg';
import { useCookies } from 'react-cookie';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const setCookie = useCookies(['token'])[1];

    const updateUsername = (event) => {
        setUsername(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const submit = (event) => {
        event.preventDefault();
        login(username, password)
        .then(response => {
            setCookie('token', response.data.access, { path: '/' });
            setSuccess('Logged in successfully.');
            setError(null);
            setTimeout(() => { window.location.href='/' }, 200);
        })
        .catch(() => {
            setSuccess(null);
            setError('Invalid credentials.');
        })

    }

    return(
        <Container>
            <h3>Login</h3>
            <Error>{error}</Error>
            <Success>{success}</Success>
            <Form style={{'margin': '20px 0px'}} onSubmit={submit}>
                
                <InputGroup className="mb-3" controlId="formBasicUsername">
                    <InputGroup.Text>
                        <img src={person_icon} alt="Username" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter username..." value={username} onChange={updateUsername} />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicPassword">
                    <InputGroup.Text>
                        <img src={lock_icon} alt="Password" />
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Enter password..." value={password} onChange={updatePassword} />
                </InputGroup>
                
                <Button variant="outline-dark" type="submit">
                    Submit
                </Button>

            </Form>

            <h6>First time here?</h6>
            <a href='/register'>Create an account</a>
        </Container>
    )
}
export default Login;