import * as actionTypes from '../constants/actionTypes';

export const posts = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_SUCCESS:
            return state.concat(action.posts);
        default:
            return state;
    }
}