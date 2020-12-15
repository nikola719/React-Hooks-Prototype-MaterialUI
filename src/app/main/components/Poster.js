import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { postActions } from '../../store/actions';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Poster = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authorization);
    const history = useHistory();

    const onChangeTitle = useCallback((e) => {
        const title = e.target.value;
        setTitle(title);
    }, [title]);

    const onChangeDescription = useCallback((e) => {
        const description = e.target.value;
        setDescription(description);
    }, [description]);
    
    const onChangePrice = useCallback((e) => {
        const price = e.target.value;
        setPrice(price);
    }, [price]);

    const onChangeLocation = useCallback((e) => {
        const location = e.target.value;
        setLocation(location);
    }, [location]);

    const onChangeWillDeliver = useCallback((e) => {
        const willDeliver = e.target.checked;
        setWillDeliver(willDeliver);
    }, [willDeliver])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        form.current.validateAll();
        if(user) {   
            if (checkBtn.current.context._errors.length === 0) {
                dispatch(postActions.post({
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }))
                setTitle('');
                setPrice('');
                setDescription('');
                setLocation('');
                setWillDeliver(false);
            }
        } else {
            history.push('/signin');
        }
    }, [title, description, price, location, willDeliver, user]);

    return (
        <div>
            <Form onSubmit={handleSubmit} ref={form}>
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Input 
                            id="title"
                            type="text"
                            name="title"
                            className="form-control"
                            value={title}
                            onChange={onChangeTitle}
                            validations={[required]}
                            placeholder="title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Textarea 
                            id="description"
                            type="text"
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
                            placeholder="description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <Input 
                            id="price"
                            type="text"
                            name="price"
                            className="form-control"
                            value={price}
                            onChange={onChangePrice}
                            validations={[required]}
                            placeholder="price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <Input 
                            id="location"
                            type="text"
                            name="location"
                            className="form-control"
                            value={location}
                            onChange={onChangeLocation}
                            validations={[required]}
                            placeholder="location"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="willdeliver">WillDeliver</label>
                        <Input
                            type="checkbox" 
                            id="willdeliver"
                            name="willdeliver"
                            className="form-control"
                            checked={willDeliver}
                            onChange={onChangeWillDeliver}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Submit</button>
                    </div>

                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
}

export default Poster;
