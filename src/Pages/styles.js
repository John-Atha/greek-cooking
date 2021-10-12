import styled from 'styled-components';

export const ScrollablePage = styled.div`
    ${props => props.mobile && `
        padding-bottom: 70px;
        padding-left: 0px;
    `}
    ${props => !props.mobile && `
        padding-left: 2px;
        padding-bottom: 10px;
    `}
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgb(198, 247, 190);
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
`

export const ProfileInfo = styled.div`
    padding: 5px;
    margin: auto;
    width: 300px;
    overflow-x: auto;
    font-size: 1.2rem;
    text-align: center;
`