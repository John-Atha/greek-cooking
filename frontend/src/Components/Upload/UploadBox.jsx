import React, { useState, useEffect } from 'react';
import { Container } from '../Recipe/styles';
import { TextContainer, LabelPill, MyInput, InputContainer } from './styles';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import text_icon from 'bootstrap-icons/icons/file-earmark-text.svg';
import title_icon from 'bootstrap-icons/icons/fonts.svg';

function UploadBox(props) {
    const [userId, setUserId] = useState(props.id);
    const [title, setTitle] = useState('');

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    
    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    const submit = (event) => {
        event.preventDefault();
    }

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    return (
        <Container>
            <Form style={{'margin': '20px auto', 'width': '90%', 'text-align': 'center'}} onSubmit={submit}>
                <InputGroup className="mb-3" controlId="formBasicUsername">
                    <InputGroup.Text>
                        <img src={title_icon} alt='title' />
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="Type your new recipe's title..." value={title} onChange={updateTitle} />
                </InputGroup>

                <InputContainer>
                    <LabelPill>
                        Upload an image
                    </LabelPill>
                    <MyInput id="new-photo" type="file" accept="image/*, video/*"/>
                </InputContainer>

                <LabelPill noBorder={true}>And add some text (ingredients, steps, secret tips...)</LabelPill>
                <TextContainer>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                    />
                </TextContainer>
                
                <Button variant="outline-dark" type="submit" style={{'margin': 'auto', 'width': '50%'}}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default UploadBox;