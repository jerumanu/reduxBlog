import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from "../users/usersSlice";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
           
           <div className="container p-5  d-flex justify-content-center ">
                
                <Card border="secondary p-3 border-light "  style={{ width: '50rem' }}>
                <h2 className="text-center"> Edit  Post</h2>
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
                    
          <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="me-2" aria-label="Second group">
                    <Button className=' mr-3 '
                        type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                    >Save Post </Button>
                     </ButtonGroup>
                     <ButtonGroup className="me-2" aria-label="Second group">
                     <Button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </Button>
                </ButtonGroup>
                </ButtonToolbar>
                </Form>
                </Card>
                </div> 
              </section>
    )
}

export default EditPostForm
