import React, { useState, useEffect } from 'react';
import { isLogged, getAllRecipes } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import Recipe from '../Components/Recipe/Recipe';
import MyNavbar from '../Components/Navbar/MyNavbar';

function Home() {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [cookies, setCookie] = useCookies(['token']);
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

    const getRecipes = () => {
        getAllRecipes()
        .then(response => {
            setRecipes(response.data);
        })
        .catch(() => {
            setNoData(true);
        })
    }

    useEffect(() => {
        checkLogged();
        getRecipes();
    }, [])

    return (
        <ScrollablePage>
            <MyNavbar />
            <div style={{'marginTop': '70px'}} />
            <h2>Latest recipes</h2>
            <div>
                {recipes.map(value => {
                    return (
                        <Recipe recipe={value} key={value.id} userId={userId} />
                    )
                })}
            </div>
        </ScrollablePage>
    )

}

export default Home;