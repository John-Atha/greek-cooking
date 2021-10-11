import React, { useState, useEffect } from 'react';
import { isLogged, getAllRecipes } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import Recipe from '../Components/Recipe/Recipe';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { Button, Spinner } from 'react-bootstrap';
import { Error } from '../Components/LoginRegister/styles';

function Home() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const cookies = useCookies(['token'])[0];
    const [noData, setNoData] = useState(false);
    const [start, setStart] = useState(1);

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

    const getRecipes = () => {
        getAllRecipes(start, start+10)
        .then(response => {
            console.log(response);
            setRecipes(recipes.concat(response.data));
            if (!response.data.length) setNoData(true);
        })
        .catch(() => {
            setNoData(true);
        })
    }

    useEffect(() => {
        checkLogged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start])

    return (
        <ScrollablePage>
            <MyNavbar userId={userId} username={username} />
            <div style={{'marginTop': '70px'}} />
            <h2>Latest recipes</h2>
            <div>
                {recipes.map(value => {
                    return (
                        <Recipe brief={false} recipe={value} key={value.id} userId={userId} />
                    )
                })}
            </div>
            {!recipes.length && !noData &&
                <div style={{'textAlign': 'center', 'margin': '20px'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }
            {!recipes.length && noData &&
                <Error>No recipes found.</Error>
            }
            {recipes.length===0 && noData &&
                <Error>No more recipes found.</Error>
            }
            {recipes.length!==0 && !noData &&
                <Button variant='primary' style={{'width': '90%', 'marginLeft': '5%'}} onClick={()=>setStart(start+10)}>See more</Button>
            }
        </ScrollablePage>
    )

}

export default Home;