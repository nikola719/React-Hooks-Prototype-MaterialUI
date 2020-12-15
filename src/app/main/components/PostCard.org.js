import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { postActions } from '../../store/actions';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const PostCard = ({
    _id,
    title, 
    description,
    author, 
    active, 
    messages, 
    price,
    isAuthor,
    location,
    willDeliver
}) => {
    const dispatch = useDispatch();
    const handleDelete = useCallback(
        (id) => {
            dispatch(postActions.deletePost(id))
        },
        [],
    )
    const [message, setMessage] = useState("");

    const onChangeMessage = useCallback((e) => {
        const message = e.target.value;
        setMessage(message)
    }, [message]);

    const handleMessage = useCallback((e) => {
        e.preventDefault();
        dispatch(postActions.sendMessage(_id, message))
    }, [message])
        
    return (
        <div className={`post-container ${isAuthor ? 'highlight' : ''}`}>
            <p>
                author- {author.username}
            </p>
            <p>
                title - {title}
            </p>
            <p>
                description- {description}
            </p>
            <p>
                price- {price}
            </p>
            <p>
                Location- {location}
            </p>
            <p>
                willDeliver- {willDeliver ? 'Deliver' : 'Not Deliver'}
            </p>
            {
                !isAuthor && (
                    <div>
                        <Form onSubmit={handleMessage}>
                            <div>
                                <div className="form-group">
                                    <Input 
                                        id="title"
                                        type="text"
                                        name="message"
                                        className="form-control"
                                        value={message}
                                        onChange={onChangeMessage}
                                        placeholder="Place your comment"
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Send</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
            }
            {
                isAuthor && (
                    <div>
                        <button onClick={() => handleDelete(_id)}>Delete</button>
                    </div>
                )
            }
        </div>
    )
}

export default PostCard;