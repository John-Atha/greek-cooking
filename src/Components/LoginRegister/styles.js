import styled from 'styled-components';
import { with_whitespace } from '../../generalStyles';

export const Page = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-color: rgb(198, 247, 190);
    padding-top: 10vh;
`

export const Container = styled.div`
    padding: 20px;
    margin: auto;
    width: 400px;
    max-width: 100vw;
    border: 1px solid grey;
    border-radius: 8px;
    color: black;
`

export const Error = styled.h6`
    color: red;
    ${with_whitespace}
`

export const Success = styled.h6`
    color: green;
    ${with_whitespace}
`