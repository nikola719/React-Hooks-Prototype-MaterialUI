import { postActionTypes } from '../../configs';

const initialState = {
    isProcessing: false,
    posts: []
};

const posts = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case postActionTypes.FETCH_POSTS_REQUEST:
        case postActionTypes.ADD_POST_REQUEST:
        case postActionTypes.DELETE_POST_REQUEST:
        case postActionTypes.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                isProcessing: true
            }
        case postActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                posts: payload
            }
        case postActionTypes.ADD_POST_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                posts: [
                    ...state.posts,
                    payload
                ]
            }
        case postActionTypes.DELETE_POST_SUCCESS:
            const index = state.posts.findIndex(post => post._id === payload)
            state.posts.splice(index, 1)
            return {
                ...state,
                isProcessing: false,
                posts: state.posts
            }
        case postActionTypes.SEND_MESSAGE_SUCCESS:
            const index1 = state.posts.findIndex(post => post._id === payload.id)
            state.posts[index1].message.push(payload.message); 
            return {
                ...state,
                isProcessing: false,
                posts: state.posts
            }
        case postActionTypes.FETCH_POSTS_FAILURE:
        case postActionTypes.DELETE_POST_FAILURE:
            return {
                ...state,
                isProcessing: false,
            }
        default:
            return state;
    }
}

export default posts;