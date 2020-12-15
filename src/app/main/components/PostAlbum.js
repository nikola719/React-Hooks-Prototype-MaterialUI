import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from '../components';
import { postActions } from '../../store/actions';

const PostAlbum = () => {
    const { posts } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(postActions.getAllPosts());
    }, [])

    return (
        <div>
            {
                posts &&
                posts.map(post => {
                    return (
                        <PostCard key={post._id} {...post}/>
                    )
                })
            }
        </div>
    )
}

export default PostAlbum;