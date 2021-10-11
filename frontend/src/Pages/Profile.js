import React, { useState, useEffect } from 'react';
import Search from '../Components/Search/Search';
import { ScrollablePage, ProfileInfo } from './styles';
import { Error } from '../Components/LoginRegister/styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import MobileTopBrand from '../Components/Navbar/MobileTopBrand';
import { isLogged, getOneUser } from '../api/api';
import { useCookies } from 'react-cookie';
import { Spinner } from 'react-bootstrap';


function Profile(props) {

    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const cookies = useCookies(['token'])[0];
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [recipesNum, setRecipesNum] = useState(0);

    const id = parseInt(props.id);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScrollablePage mobile={window.innerWidth<=600}>
            <MobileTopBrand userId={userId} username={username} />
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            {user &&
                <ProfileInfo>
                    <h2>{user.username}</h2>
                </ProfileInfo>
            }
            <h4>{user ? `Recipes (${recipesNum})` : ''}</h4>
            
            {user &&
                <Search userId={userId} id={id} username={username} case='My' setRecipesNum={setRecipesNum} />
            }
            {!user && !error &&
                <div style={{'text-align': 'center', 'margin': '20px'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }
            {!user && error &&
                <Error>Sorry, we could not find this user.</Error>
            }
        </ScrollablePage>
    )

}

export default Profile;