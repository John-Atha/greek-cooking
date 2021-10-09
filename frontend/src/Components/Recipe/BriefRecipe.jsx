import React, { useState, useEffect } from 'react';
import { Container, TitleButton, Description, Header, Fans } from './styles';
import heart_icon from 'bootstrap-icons/icons/heart.svg';

function BriefRecipe(props) {
    const [recipe, setRecipe] = useState(props.recipe);

    useEffect(() => { 
        setRecipe(props.recipe);
    }, [props.recipe])

    return (
        <Container>
            <TitleButton>{recipe.title}</TitleButton>
            <Header>From <a href={`/users/${recipe.owner.id}`}>{recipe.owner.username}</a>, on {recipe.uploaded_at.slice(0, 10)}</Header>
            <hr style={{'margin': '4px'}} />
            <Description>{recipe.description}</Description>
            <Fans>
                <img src={heart_icon} alt='fans' />
                <div>{recipe.fans}</div>
            </Fans>
        </Container>
    )
}

export default BriefRecipe;