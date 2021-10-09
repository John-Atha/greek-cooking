import styled from 'styled-components';
import { flex_wrap, with_whitespace } from '../../generalStyles';

export const Container = styled.div`
    border: 1px solid grey;
    padding: 5px;
    border-radius: 7px;
    margin: 10px auto;
    background-color: white;
    ${with_whitespace}
    ${flex_wrap}
    width: 800px;
    marign: auto;
    max-width: 100vw;
`
export const TitleHref = styled.a`
    border: none;
    background-color: rgb(198, 247, 190, 0.5);
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    padding: 5px;
    &:hover { 
        text-decoration: none;
        cursor: pointer;
    }
`

export const Description = styled.div`
    font-size: 0.9rem;
`

export const Header = styled.div`
    color: grey;
    font-size: 0.9rem;
    & a {
        text-decoration: none;
    }
`

export const Fans = styled.button`
    ${flex_wrap}
    margin: 10px;
    border: none;
    background-color: inherit;
`

export const RecipeImg = styled.img`
    width: 80%;
    max-width: 700px;
    height: auto;
    border-radius: 7px;
    margin: 10px 10%;
`

export const Break = styled.div`
    flex-basis: 100%;
    height: 0;
`

export const LikeImg = styled.img`
    height: 20px;
    margin-top: 2px;
    margin-right: 2px;
`

export const EditImg = styled.img`
    font-size: 1rem;
    margin: 3px;
`

export const EditButton = styled.button`
    border: none;
    background-color: inherit;
    position: absolute;
    top: 5px;
    right: 5px;
    ${flex_wrap}
`