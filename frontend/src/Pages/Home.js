import React, { useState, useEffect } from 'react';
import { isLogged, getAllBriefRecipes } from '../api/api';
import { useCookies } from 'react-cookie';
import { ScrollablePage } from './styles';
import BriefRecipe from '../Components/Recipe/BriefRecipe';

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
        getAllBriefRecipes()
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
            <h2>Latest recipes</h2>
            <div>
                {recipes.map(value => {
                    return (
                        <BriefRecipe recipe={value} key={value.id} />
                    )
                })}
            </div>
        </ScrollablePage>
    )

}

export default Home;