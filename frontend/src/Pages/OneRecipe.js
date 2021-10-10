import React, { useState, useEffect } from 'react';
import { isLogged, getOneRecipe } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import Recipe from '../Components/Recipe/Recipe';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { Spinner } from 'react-bootstrap';
import { Error } from '../Components/LoginRegister/styles';

function OneRecipe(props) {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const cookies = useCookies(['token'])[0];
    const [noData, setNoData] = useState(false);

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

    const getRecipe = () => {
        getOneRecipe(parseInt(props.id))
        .then(response => {
            setRecipe(response.data);
            console.log(response.data);
        })
        .catch(() => {
            setNoData(true);
        })
    }

    useEffect(() => {
        checkLogged();
        getRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            {recipe &&
                <Recipe brief={false} recipe={recipe} key={recipe.id} userId={userId} page={true} />        
            }
            {noData &&
                <Error>Sorry, we could not find this recipe.</Error>
            }
            {!recipe && !noData &&
                <div style={{'text-align': 'center', 'margin': '20px'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }
        </ScrollablePage>
    )

}

export default OneRecipe;