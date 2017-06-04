import * as actionTypes from '../constants/actionTypes';

const baseUrl = 'http://www.aocai.com.au/wordpress/wp-json/wp/v2/posts';
const url = baseUrl + '?filter%5Bcat%5D=389&filter%5Bposts_per_page%5D=10&filter%5Bpaged%5D=1';

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    }
};

export const fetchPosts = () => {
    return (dispatch) => {
        fetch(url, {method: "GET"})
            .then((response) => {
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                    response.status);  
                    return;  
                }

                response.json().then(
                    (data) => {
                        dispatch(fetchPostsSuccess(data));
                    }
                );
            }
        );
    };
};