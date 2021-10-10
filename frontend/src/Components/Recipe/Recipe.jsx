import React, { useState, useEffect } from 'react';
import { Container, TitleHref, RecipeImg, Description, Header, Fans, Break, LikeImg, EditImg, EditButton } from './styles';
import heart_icon from 'bootstrap-icons/icons/heart.svg';
import heart_filled_icon from 'bootstrap-icons/icons/heart-fill.svg';
import edit_icon from 'bootstrap-icons/icons/pen.svg';
import { Button } from 'react-bootstrap';
import { like, unlike } from '../../api/api';
import { useCookies } from 'react-cookie';
import { createNotification } from '../../createNotification';

function Recipe(props) {
    const [recipe, setRecipe] = useState(props.recipe);
    const [userId, setUserId] = useState(props.userId);
    const [liked, setLiked] = useState(false);
    const cookies = useCookies(['token'])[0];

    useEffect(() => { 
        setRecipe(props.recipe);
    }, [props.recipe])

    useEffect(() => { 
        setUserId(props.userId);
    }, [props.userId])

    useEffect(() => {
        if (recipe && userId && !props.brief) {
            let liked_temp = false;
            recipe.fans.forEach((fan) => {
                if (fan.id===userId) {
                    liked_temp = true;
                }
            })
            setLiked(liked_temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe, userId])

    const updLiked = () => {
        if (!userId) {
            createNotification('danger', 'Sorry', 'You have to login to add a recipe to your favourites.');
            return;
        }
        if (props.brief) {
            createNotification('warning', 'Hello,', 'Visit the recipe\'s page to add it to your favourites.');
            return;
        }
        if (liked) {
            unlike(cookies.token, userId, recipe.id)
            .then(response => {
                createNotification('warning', 'Hello,', 'Recipe removed from favourites successfully.');
                setRecipe(response.data);
            })
            .catch(() => {
                createNotification('danger', 'Sorry', 'We could not remove this recipe from your favourites.');
            })
        }
        else {
            like(cookies.token, userId, recipe.id)
            .then(response => {
                createNotification('success', 'Hello,', 'Recipe added to favourites successfully.');
                setRecipe(response.data);
            })
            .catch(() => {
                createNotification('danger', 'Sorry', 'We could not add this recipe to your favourites.');
            })
        }
    }

    const edit = () => {
        if (!props.page) {
            window.location.href=`/recipes/${recipe.id}`;
        }
    }

    return (
        <Container>
            <TitleHref href={`/recipes/${recipe.id}`}>{recipe.title}</TitleHref>
            {userId === props.recipe.owner.id &&
                <EditButton onClick={edit}>
                    <EditImg src={edit_icon} alt='edit' />
                    <div>Edit</div>
                </EditButton>
                
            }
            <Fans onClick={updLiked}>
                <LikeImg src={liked ? heart_filled_icon : heart_icon} alt='fans' />
                <div>{typeof(recipe.fans)==='number' ? recipe.fans : recipe.fans.length}</div>
            </Fans>
            <Break />
            <Header>From <a href={`/users/${recipe.owner.id}`}>{recipe.owner.username}</a>, on {recipe.uploaded_at.slice(0, 10)}</Header>
            <Break />
            {recipe.image && !props.brief &&
                <RecipeImg src={`http://127.0.0.1:8000${recipe.image}`} alt={recipe.title}/>        
            }
            <Break />
            <hr style={{'margin': '4px', 'width': '100%'}} />
            <Break />
            {props.brief && !props.page &&
                <Description>{recipe.description}</Description>
            }
            {!props.brief && !props.page &&
                <Description>{`${recipe.description.slice(0, 200)} ...`}</Description>
            }
            {props.page &&
                <Description>{recipe.description}</Description>
            }
            <Break />
            {!props.page &&
                <Button variant='success' style={{'marginTop': '10px'}} onClick={()=>window.location.href=`/recipes/${recipe.id}`}>See details</Button>        
            }
        </Container>
    )
}

export default Recipe;