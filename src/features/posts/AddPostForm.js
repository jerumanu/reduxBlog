import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card } from "react-bootstrap";


const AddPostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
          
            <div className="container p-5 d-flex justify-content-center ">
                
            <Card border="secondary p-3 border-light "  style={{ width: '50rem' }}>
            <h2 className="text-center">Add a New Post</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label >Post Title:</Form.Label>
                <Form.Control
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label  >Author:</Form.Label>
                <Form.Select  id="postAuthor" value={userId} onChange={onAuthorChanged}>
         <option value=""></option>
                    {usersOptions}
      </Form.Select> 

                
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label >Blog</Form.Label>
        <Form.Control as="textarea"  id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged} rows={8} />
      </Form.Group>
                
             
                <Button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post </Button>
            </Form>
            </Card>
            </div>
        </section>
    )
}

export default AddPostForm