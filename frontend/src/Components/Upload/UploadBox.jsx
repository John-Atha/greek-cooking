import React, { useState, useEffect } from 'react';
import { upload } from '../../api/api';
import { Container } from '../Recipe/styles';
import { TextContainer, LabelPill, MyInput, InputContainer } from './styles';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useCookies } from 'react-cookie';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import title_icon from 'bootstrap-icons/icons/fonts.svg';
import { createNotification } from '../../createNotification';

function UploadBox(props) {
    const [userId, setUserId] = useState(props.id);
    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const cookies = useCookies(['token'])[0];
    const [uploading, setUploading] = useState(false);
    
    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId])

    useEffect(() => { 
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }, [editorState])

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    const submit = (event) => {
        event.preventDefault();
        if (!title) {
            createNotification('danger', 'Sorry', 'Title cannot be empty.');
            return;
        }
        if (draftToHtml(convertToRaw(editorState.getCurrentContent()))==='<p></p>') {
            createNotification('danger', 'Sorry', 'Text cannot be empty.');
            return;
        }
        console.log('Submission with:');
        console.log('Title:', title);
        console.log('Text:', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        const input = document.getElementById('new-photo');
        let img = null;
        if (input.files.length) {
            img = input.files[0];
        }
        setUploading(true);
        upload(cookies.token, title, draftToHtml(convertToRaw(editorState.getCurrentContent())), img)
        .then(response => {
            setUploading(false);
            createNotification('success', 'Thanks!!', 'Recipe was uploaded successfully.');
            setTimeout(()=>window.location.href=`/recipes/${response.data.id}`, 500);
        })
        .catch(() => {
            createNotification('danger', 'Sorry', 'We could not upload your recipe.');
        })
    }

    return (
        <Container>
            {!uploading &&
                <Form style={{'margin': '20px auto', 'width': '90%', 'textAlign': 'center'}} onSubmit={submit}>
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
            }
            {uploading &&
                <div style={{'textAlign': 'center', 'margin': '20px'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }

        </Container>
    )
}

export default UploadBox;