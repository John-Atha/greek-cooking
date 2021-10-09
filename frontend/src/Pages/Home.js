import React, { useState, useEffect } from 'react';
import { isLogged, getAllRecipes } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import Recipe from '../Components/Recipe/Recipe';
import MyNavbar from '../Components/Navbar/MyNavbar';
import { Button } from 'react-bootstrap';

function Home() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
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
            setRecipes(response.data);
        })
        .catch(() => {
            setNoData(true);
        })
    }

    useEffect(() => {
        checkLogged();
    }, [])

    useEffect(() => {
        getRecipes();
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
            <Button variant='primary' style={{'width': '90%', 'marginLeft': '5%'}}>See more</Button>
        </ScrollablePage>
    )

}

export default Home;