import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    WebView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { fetchPosts } from '../actions/postActions';

class PostContent extends Component {
    constructor(props) {
        super(props);
        this.handleNavigationChange = this.handleNavigationChange.bind(this);

        this.state = {
            realContentHeight: 0,
            minHeight: 400
        }
    }

    getInjectedJavascript() {
        const scripts = [];
        const esizeImagesScript = `
            ;(function() {
                let imgs = document.getElementsByTagName("img"); 
                for (i = 0; i < imgs.length; i++) {
                    imgs[i].style.width = "100%";
                    imgs[i].style.height = "auto";
                }
            })();
            `;
        scripts.push(esizeImagesScript);

        const calculateWebViewHeightScript = `
            ;(function() {
                var wrapper = document.createElement("div");
                wrapper.id = "height-wrapper";
                while (document.body.firstChild) {
                    wrapper.appendChild(document.body.firstChild);
                }
                document.body.appendChild(wrapper);
                var i = 0;
                function updateHeight() {
                    document.title = wrapper.clientHeight + 20;
                    window.location.hash = ++i;
                }
                updateHeight();
                window.addEventListener("load", function() {
                    updateHeight();
                    setTimeout(updateHeight, 1000);
                });
                window.addEventListener("resize", updateHeight);
            }());
            `;
        scripts.push(calculateWebViewHeightScript);
        
        return _.join(scripts, '');
    }

    handleNavigationChange(navState) {
        if (navState.title) {
            const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
            this.setState({
                realContentHeight
            });
        }
        // if (typeof this.props.onNavigationStateChange === "function") {
        //     this.props.onNavigationStateChange(navState);
        // }
    }

    handleLoaded(params) {
        // console.log("handleLoaded ==> ", params)
    }

    getDateString(dateGmt) {
        let thisDate = new Date(dateGmt);
        let fullYear = thisDate.getUTCFullYear();
        let month = thisDate.getUTCMonth() + 1;
        let day = thisDate.getUTCDate();
        let hour = thisDate.getUTCHours();
        let minutes = thisDate.getUTCMinutes();

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return fullYear + '年' + month + '月' + day + '日 ' + hour + '点' + minutes + '分';
    }

    render() {
        let title = this.props.post.title ? this.props.post.title.rendered : '';
        let injectedJavaScript = this.getInjectedJavascript();

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.headerSubTitle}>{this.getDateString(this.props.post.date_gmt)}   {this.props.post.author_detail.author_display_name}</Text>
                <Image source={{url: 'http://www.aocai.com.au' + this.props.post.type_img}} style={styles.headerImage}/>
                <WebView 
                    source={{html: this.props.post.content.rendered}}
                    style={{marginVertical: 20, height: Math.max(this.state.realContentHeight, this.state.minHeight)}}
                    scrollEnabled={false}
                    injectedJavaScript={injectedJavaScript}
                    onLoad={this.handleLoaded}
                    onNavigationStateChange={this.handleNavigationChange}
                />
            </ScrollView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerImage: {
        flex: 1,
        resizeMode: "cover",
        height: 200
    },
    headerTitle: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 25,
        marginBottom: 15,
        fontSize: 22,
        fontWeight: "600"
    },
    headerSubTitle: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 10,
        marginBottom: 10
    },

    webview_header: {
        paddingLeft: 10,
        backgroundColor: '#FF6600',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    header_item: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    button: {
        textAlign: 'left',
        color: '#FFF'
    },
    page_title: {
        color: '#FFF'
    },
    spinner: {
 
        alignItems: 'flex-end'
    }
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