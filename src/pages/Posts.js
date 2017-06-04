import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPosts } from '../actions/postActions';
import NewsCard from '../components/NewsCard';
import PostContent from '../pages/PostContent';

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: (typeof props.posts !== 'undefined') ? props.posts : []
        }

        props.fetchPosts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.posts !== this.props.posts) {
            this.setState({
                posts: this.props.posts
            })
        }
    }

    _handleNextPress(id) {
        let post = _.find(this.state.posts, {id: id});

        console.log('post -> ', post);

        const nextRoute = {
            component: PostContent,
            title: 'Post content',
            passProps: { post: post }
        };

        this.props.navigator.push(nextRoute);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.posts.map(post => 
                        <NewsCard 
                            key={post.id}
                            id={post.id}
                            title={post.title.rendered}
                            image={post.type_img}
                            date={post.date}
                            description={post.description}
                            onPress={(id) => this._handleNextPress(id)}
                        />
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);