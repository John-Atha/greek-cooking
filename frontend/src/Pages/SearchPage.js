import React, { useState, useEffect } from 'react';
import Search from '../Components/Search/Search';
import { ScrollablePage } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { isLogged } from '../api/api';
import { useCookies } from 'react-cookie';

function SearchPage(props) {

    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const cookies = useCookies(['token'])[0];


    const checkLogged = () => {
        isLogged(cookies.token)
        .then(response => {
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(() => {
            if (props.case==='Favourite' || props.case==='My') window.location.href='/';
        })
    }

    useEffect(() => {
        checkLogged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            <h2>{props.case} recipes</h2>
            <Search userId={userId} username={username} case={props.case} />
        </ScrollablePage>
    )

}

export default SearchPage;