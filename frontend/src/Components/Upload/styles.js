import styled from 'styled-components';
import { flex_wrap } from '../../generalStyles';

export const TextContainer = styled.div`
    border: 1px solid black;
    padding: 2px;
    min-height: 400px;
    margin: 10px 0px;
`

export const LabelPill = styled.div`
    background-color: #e9ecef;
    padding: 5px;
    ${props => !props.noBorder && `
        border-right: 1px solid lightgrey;
    `}
`

export const MyInput = styled.input`
    padding: 2px;
    margin-left: 5px;
`

export const InputContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 4px;
    ${flex_wrap}
    margin: 10px 0px;
`