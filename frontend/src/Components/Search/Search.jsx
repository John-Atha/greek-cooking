import React, { useState, useEffect } from 'react';
import { getAllBriefRecipes, getFavRecipes, getUserRecipes } from '../../api/api';
import Recipe from '../Recipe/Recipe';
import { Form, Button, InputGroup } from 'react-bootstrap';
import search_icon from 'bootstrap-icons/icons/search.svg';
import { Error } from '../LoginRegister/styles';

function Search(props) {

    const [userId, setUserId] = useState(props.userId);
    const [username, setUsername] = useState(props.username);
    const [recipes, setRecipes] = useState([]);
    const [noData, setNoData] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');

    const getRecipes = () => {
        let f = null;
        let id = null;
        switch (props.case) {
            case 'All':
                f = getAllBriefRecipes;
                break;
            case 'Favourite':
                f = getFavRecipes;
                id = userId;
                break;
            case 'My':
                f = getUserRecipes;
                id = userId;
                break;
        }
        console.log(f);
        console.log(id);
        f(id)
        .then(response => {
            setRecipes(response.data);
            setSuggestions(response.data);
        })
        .catch(() => {
            setNoData(true);
        })
    }

    useEffect(() => {
        getRecipes();
    }, [userId])

    useEffect(() => {
        setUserId(props.userId);
        setUsername(props.username);
    }, [props.userId, props.username])

    const updateText = (event) => {
        event.preventDefault();
        setText(event.target.value);
    }

    const submit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (!text) {
            setSuggestions(recipes.slice());
            return;
        }
        const suggestions_temp = recipes.slice();
        setSuggestions(suggestions_temp.filter(value => {
            return (
                value.title.toLowerCase().startsWith(text.toLowerCase())
            );
        }))

    }, [text])
    
    return (
        <div>
            <Form style={{'margin': '20px 0px', 'display': 'flex', 'flexFlow': 'row wrap'}} onSubmit={submit}>
                <InputGroup className="mb-3" controlId="formBasicText" style={{'width': '100%', 'maxWidth': '500px'}}>
                    <InputGroup.Text>
                        <img src={search_icon} alt="search" />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Search for a title..." value={text} onChange={updateText} />
                </InputGroup>
                <Button variant="outline-dark" type="submit" style={{'marginTop': '-15px', 'marginLeft': '5px'}}>
                    Search
                </Button>
            </Form>

            <div>
                {suggestions.map(value => {
                    return (
                        <Recipe brief={props.case==='All'} recipe={value} key={value.id} userId={userId} />
                    )
                })}
                {!suggestions.length &&
                    <Error>No matching recipes found.</Error>
                }
            </div>

        </div>
    );
}

export default Search;