import React from 'react';
import {AsyncStorage, Image, Text, View} from 'react-native';
import TabContent from '../../components/TabContent';
import Loading from '../../components/Loading';

// Redux
import { connect } from 'react-redux';
import {ActivityIndicator} from "react-native-paper";

class TabTree extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let url = null;
        if(navigation.getParam('favorite') !== undefined){
            url = navigation.getParam('favorite');
            url = 'https://www.cryptocompare.com' + url.ImageUrl
        }
        return {
            tabBarIcon:
                url !== null ?
                    (
                        <Image
                            source={{ uri: url }}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30,
                                marginBottom: 15
                            }}
                        />
                    ):(
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='small' color={'#eb5085'} />
                        </View >
                    )
        };
    };

    state= {
        changes: null,
        favorites: [],
        localCurrency: null
    };

    componentDidMount(){
        this.setState({ favorites: this.props.favorites });
        this.props.navigation.setParams({ favorite: this.props.favorites[2] });
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                { this.props.changes !== null ? (
                    <TabContent change={this.props.changes[2]} />
                ):(
                    <Loading displayColor='#eb5085'/>
                )}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        changes: state.changeReducer.changes,
        favorites: state.changeReducer.favorites,
        localCurrency: state.changeReducer.localCurrency
    }
};

export default connect(mapStateToProps)(TabTree)