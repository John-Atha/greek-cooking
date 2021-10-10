import React, { useState, useEffect } from 'react';
import { isLogged } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import UploadBox from '../Components/Upload/UploadBox';

function UploadPage() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        isLogged(cookies.token)
        .then(response => {
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(() => {
            window.location.href = '/';
        })
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            {username &&
                <h2>Hi {username}, feeling creative?</h2>
            }
            <UploadBox userId={userId} />
        </ScrollablePage>
    )
}

export default UploadPage;