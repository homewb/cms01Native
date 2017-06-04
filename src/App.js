import React, { Component } from 'react';
import {
    StyleSheet,
    NavigatorIOS
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from './actions/postActions';
import Posts from './pages/Posts';

class App extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: Posts,
                    title: 'Posts',
                }}
                style={{flex: 1}}
            />
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

export default App;

