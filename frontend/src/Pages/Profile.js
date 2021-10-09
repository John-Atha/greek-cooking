import React, { useState, useEffect } from 'react';
import Search from '../Components/Search/Search';
import { ScrollablePage, ProfileInfo } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { isLogged, getOneUser } from '../api/api';
import { useCookies } from 'react-cookie';

function Profile(props) {

    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);
    const [id, setId] = useState(parseInt(props.id));
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [recipesNum, setRecipesNum] = useState(0);

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

    const getUser = () => {
        getOneUser(id)
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            setError('Sorry, we could not find this user.');
        })
    }

    useEffect(() => {
        checkLogged();
        getUser();
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            {user &&
                <ProfileInfo>
                    <h2>{user.username}</h2>
                </ProfileInfo>
            }
            <h4>{user ? `Recipes (${recipesNum})` : ''}</h4>
            <Search userId={userId} id={id} username={username} case='My' setRecipesNum={setRecipesNum} />
        </ScrollablePage>
    )

}

export default Profile;