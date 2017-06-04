import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
// import { Card, CardItem, Text } from 'native-base';


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        margin: 10,
        position: "relative",
        borderRadius: 2
    },

    backgroundImage: {
        flex: 1,
        width: null,
        height: 200,
        resizeMode: 'cover'
    },

    backgroundImageInnerText: {
        textAlign: 'left',
        paddingHorizontal: 5,
        paddingVertical: 10,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: 20,

        width: "100%",
        position: "absolute",
        bottom: 0
    },

    cardContent: {
        position: "relative"
    },

    cardContentInner: {
        padding: 15,
        position: "relative"
    },

    cardContentFirstP: {
        marginTop: 0,
        color: "#8e8e93"
    },

    cardContentLastP: {
        marginBottom: 0
    }
})

export default class NewsCard extends Component {
    /*render() {
        return (
            <Card>
                <CardItem header>
                    <Text>{this.props.title.trim()}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{url: 'http://www.aocai.com.au' + this.props.image}} style={{width: 193, height: 110}}/>
                </CardItem>
                <CardItem header>
                    <Text>{this.props.description.trim()}</Text>
                </CardItem>
            </Card>
        );
    }*/

    render() {
        return (
            <TouchableHighlight onPress={() => this.props.onPress(this.props.id)}>
                <View style={styles.card}>
                    <Image source={{url: 'http://www.aocai.com.au' + this.props.image}} style={styles.backgroundImage}>
                        <Text style={styles.backgroundImageInnerText}>{this.props.title.trim()}</Text>
                    </Image>
                    <View style={styles.cardContent}>
                        <Text style={[styles.cardContentInner, styles.cardContentFirstP]}>{this.props.date}</Text>
                        <Text style={[styles.cardContentInner, styles.cardContentLastP]}>{this.props.description.trim()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


}