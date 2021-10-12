import React, { useState, useEffect } from 'react';
import { getOneRecipe, isLogged } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import MyNavbar from '../Components/Navbar/MyNavbar';
import MobileTopBrand from '../Components/Navbar/MobileTopBrand';
import UploadBox from '../Components/Upload/UploadBox';
import { Spinner } from 'react-bootstrap';
import { base } from '../base';

function EditPage(props) {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const cookies = useCookies(['token'])[0];
    const id = parseInt(props.id);

    const checkLogged = () => {
        isLogged(cookies.token)
        .then(response => {
            setUserId(response.data.id);
            setUsername(response.data.username);
        })
        .catch(() => {
            window.location.href = `${base}/`;
        })
    }

    const getRecipe = () => {
        getOneRecipe(id)
        .then(response => {
            if (response.data.owner.id !== userId) {
                window.location.href = `${base}/`;
                return;
            }
            setRecipe(response.data);
        })
        .catch(() => {
            window.location.href = `${base}/`;
            return;
        })
    }
    
    useEffect(() => {
        checkLogged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userId) {
            getRecipe();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    return (
        <ScrollablePage mobile={window.innerWidth<=600}>
            <MobileTopBrand userId={userId} username={username} />
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            {recipe &&
                <h3>Hi {username}, from here you can edit your recipe '{recipe.title}'</h3>
            }
            {recipe &&
                <UploadBox userId={userId} edit={true} recipe={recipe} />        
            }
            {!recipe &&
                <div style={{'textAlign': 'center', 'margin': '20px'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }
        </ScrollablePage>
    )
}

export default EditPage;