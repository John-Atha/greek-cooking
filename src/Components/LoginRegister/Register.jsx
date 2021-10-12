import React, { useState } from 'react';
import { register, login } from '../../api/api';
import { Container, Success, Error } from './styles';
import { Form, Button, InputGroup } from 'react-bootstrap';
import person_icon from 'bootstrap-icons/icons/person.svg';
import lock_icon from 'bootstrap-icons/icons/lock.svg';
import email_icon from 'bootstrap-icons/icons/envelope.svg'
import { useCookies } from 'react-cookie';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const setCookie = useCookies(['token'])[1];

    const updateUsername = (event) => {
        setUsername(event.target.value);
        if (password && password===confirmation) setError(null);
    }
    const updatePassword = (event) => {
        setPassword(event.target.value);
        if (confirmation && event.target.value !== confirmation) {
            setSuccess(null);
            setError('Passwords do not match.');
        }
        else {
            setError(null);
        }
    }
    const updateConfirmation = (event) => {
        setConfirmation(event.target.value);
        if (password && password !== event.target.value) {
            setSuccess(null);
            setError('Passwords do not match.');
        }
        else {
            setError(null);
        }
    }
    const updateEmail = (event) => {
        setEmail(event.target.value);
        if (password && password===confirmation) setError(null);
    }

    const buildErrorMessage = (errors) => {
        let messages = [];
        Object.entries(errors).forEach((pair) => {
            messages.push(pair[1]);
        });
        messages = messages.flat();
        return (messages.map(message => message.charAt(0).toUpperCase().concat(message.slice(1)))).join('\n');
    }

    const submit = (event) => {
        event.preventDefault();
        if (!password || !username || !email) {
            setError('Fill all the fields.');
            return;
        }
        register(username, password, confirmation, email)
        .then(response => {
            setSuccess('Account created successfully');
            setError(null);
            login(username, password)
            .then(response => {
                setCookie('token', response.data.access, { path: '/' });
                setSuccess('Logged in successfully.');
                setError(null); 
                setTimeout(() => { window.location.href='/' }, 200);
            })
            .catch(() => {
                setError('But we could not get you inside.\nPlease try logging in.')
            })
        })
        .catch((err) => {
            setSuccess(null);
            setError(buildErrorMessage(err.response.data));
        })
    }

    return(
        <Container>
            <h3>Register</h3>
            <Success>{success}</Success>
            <Error>{error}</Error>
            <Form style={{'margin': '20px 0px'}} onSubmit={submit}>
                
                <InputGroup className="mb-3" controlId="formBasicUsername">
                    <InputGroup.Text>
                        <img src={person_icon} alt="Username" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter username..." value={username} onChange={updateUsername} />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicEmail">
                    <InputGroup.Text>
                        <img src={email_icon} alt="Email" />
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="Enter email..." value={email} onChange={updateEmail} />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicPassword">
                    <InputGroup.Text>
                        <img src={lock_icon} alt="Password" />
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Enter password..." value={password} onChange={updatePassword} />
                </InputGroup>

                <InputGroup className="mb-3" controlId="formBasicPassword">
                    <InputGroup.Text>
                        <img src={lock_icon} alt="Confirmation" />
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Repeat password..." value={confirmation} onChange={updateConfirmation} />
                </InputGroup>
                
                <Button variant="outline-dark" type="submit" disabled={error}>
                    Submit
                </Button>

            </Form>

            <h6>Already have an account?</h6>
            <a href='/login'>Login</a>
        </Container>
    )
}
export default Register;