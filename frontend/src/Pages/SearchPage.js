import React, { useState, useEffect } from 'react';
import Search from '../Components/Search/Search';
import { ScrollablePage } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { isLogged } from '../api/api';
import { useCookies } from 'react-cookie';

function SearchPage() {

    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);


    const checkLogged = () => {
        isLogged(cookies.token)
        .then(response => {
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(() => {
            ;
        })
    }

    useEffect(() => {
        checkLogged();
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            <Search userId={userId} username={username} />
        </ScrollablePage>
    )

}

export default SearchPage;