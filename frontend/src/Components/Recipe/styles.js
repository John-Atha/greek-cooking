import styled from 'styled-components';
import { flex_wrap, with_whitespace } from '../../generalStyles';

export const Container = styled.div`
    border: 1px solid grey;
    padding: 5px;
    border-radius: 7px;
    margin: 10px;
    background-color: white;
    ${with_whitespace}
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

export const Fans = styled.div`
    position: absolute;
    right: 5px;
    bottom: 5px;
    ${flex_wrap}
`