import React, { useState, useEffect } from 'react';
import { upload } from '../../api/api';
import { Container, RecipeImg } from '../Recipe/styles';
import { TextContainer, LabelPill, MyInput, InputContainer } from './styles';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import { useCookies } from 'react-cookie';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import title_icon from 'bootstrap-icons/icons/fonts.svg';
import { createNotification } from '../../createNotification';

function UploadBox(props) {
    const [title, setTitle] = useState(props.edit ? props.recipe.title : '');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const cookies = useCookies(['token'])[0];
    const [uploading, setUploading] = useState(false);
    const [hasUploadedImg, setHasUploadedImg] = useState(false);
    
    useEffect(() => {
        if (props.edit) {
            const blocksFromHtml = htmlToDraft(props.recipe.description);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setEditorState(EditorState.createWithContent(contentState));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.recipe])

    const updImg = () => {
        const binaryData = [];
        binaryData.push(document.getElementById('new-photo').files[0]);
        setHasUploadedImg(window.URL.createObjectURL(new Blob(binaryData, {type: "file"})));
    }

    const updateTitle = (event) => {
        setTitle(event.target.value);
    }

    useEffect(() => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
    }, [editorState])

    const submit = (event) => {
        event.preventDefault();
        if (!title) {
            createNotification('danger', 'Sorry', 'Title cannot be empty.');
            return;
        }
        const input = document.getElementById('new-photo');
        let img = null;
        if (input.files.length) {
            img = input.files[0];
        }
        setUploading(true);
        upload(cookies.token, title, draftToHtml(convertToRaw(editorState.getCurrentContent())), img, props.recipe ? props.recipe.id : null, props.edit===true)
        .then(response => {
            if (props.edit) createNotification('success', 'Thanks!!', 'Recipe was edited successfully.');
            else createNotification('success', 'Thanks!!', 'Recipe was uploaded successfully.');
            setTimeout(()=>{
                window.location.href=`/recipes/${response.data.id}`;
            }, 500);
        })
        .catch(() => {
           if (props.edit) createNotification('danger', 'Sorry', 'We could not edit your recipe.');
           else createNotification('danger', 'Sorry', 'We could not upload your recipe.');
           setUploading(false);
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
                        <MyInput id="new-photo" type="file" accept="image/*, video/*" onChange={updImg} />
                    </InputContainer>

                    {props.edit && !hasUploadedImg && props.recipe.image &&
                        <div>
                            <h5>Previous image</h5>
                            <RecipeImg src={`http://127.0.0.1:8000${props.recipe.image}`} />
                        </div>
                    }
                    {props.edit && hasUploadedImg &&
                        <div>
                            <h5>Current image</h5>
                            <RecipeImg src={hasUploadedImg} />
                        </div>
                    }

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
                <div style={{'textAlign': 'center', 'margin': '20px auto'}}>
                    <Spinner animation="border" role="status" variant='primary' />
                </div>
            }

        </Container>
    )
}

export default UploadBox;