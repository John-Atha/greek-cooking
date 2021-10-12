import React, { useEffect } from 'react';
import { isLogged } from '../api/api';
import Login from '../Components/LoginRegister/Login';
import Register from '../Components/LoginRegister/Register';
import { Page } from '../Components/LoginRegister/styles';
import { useCookies } from 'react-cookie';
import { base } from '../base';

function LoginRegister(props) {
    const cookies = useCookies(['token'])[0];

    useEffect(() => {
        isLogged(cookies.token)
        .then(() => {
            window.location.href=`${base}/`;
        })
        .catch(() => {
            ;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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