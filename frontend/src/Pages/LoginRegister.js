import React, {useState, useEffect } from 'react';
import { isLogged } from '../api/api';
import Login from '../Components/LoginRegister/Login';
import Register from '../Components/LoginRegister/Register';
import { Page } from '../Components/LoginRegister/styles';
import { useCookies } from 'react-cookie';

function LoginRegister(props) {
    const [userId, setUserId] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        isLogged(cookies.token)
        .then(() => {
            window.location.href='/'
        })
        .catch(() => {
            ;
        })
    }, [])

    return (
        <Page>
            <h1 style={{'margin': '20px'}}>Greek cooking</h1>
            {props.login &&
                <Login />
            }
            {props.register &&
                <Register />
            }
        </Page>
    )
}

export default LoginRegister;