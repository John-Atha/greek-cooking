import styled from 'styled-components';
import { flex_wrap, with_whitespace } from '../../generalStyles';

export const Container = styled.div`
    border: 1px solid grey;
    padding: 5px;
    border-radius: 7px;
    margin: 10px;
    background-color: white;
    ${with_whitespace}
    ${flex_wrap}
    width: 600px;
    marign: auto;
    max-width: 100vw;
`
export const TitleButton = styled.button`
    border: none;
    background-color: rgb(198, 247, 190, 0.5);
    font-size: 1.2rem;
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
    width: 90%;
    max-width: 700px;
    height: auto;
    border-radius: 7px;
    margin: 10px 5px;
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