import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    WebView,
} from 'react-native';
import { connect } from 'react-redux';
// import { fetchPosts } from '../actions/postActions';

const PostContent = (props) => {
    return (
        <WebView
            source={{html: props.post.content.rendered}}
            style={{marginTop: 20}}
        />
    )
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post ? state.post : ownProps.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchPostById: (id) => dispatch(fetchPostById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);