import React, {Component} from 'react';
import {WebView} from 'react-native';

class Single extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://google.fr'}}
                style={{marginTop: 20}}
            />
        );
    }
}

export default Single;