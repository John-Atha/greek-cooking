import React, { useState, useEffect } from 'react';
import { isLogged } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import MobileTopBrand from '../Components/Navbar/MobileTopBrand';
import UploadBox from '../Components/Upload/UploadBox';
import { base } from '../base';

function UploadPage() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const cookies = useCookies(['token'])[0];

    useEffect(() => {
        isLogged(cookies.token)
        .then(response => {
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(() => {
            window.location.href = base;
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScrollablePage mobile={window.innerWidth<=600}>
            <MobileTopBrand userId={userId} username={username} />
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