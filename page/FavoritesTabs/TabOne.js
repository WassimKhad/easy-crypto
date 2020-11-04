import React from 'react';
import {AsyncStorage, Dimensions, Image, Text, View} from 'react-native';
import TabContent from '../../components/TabContent';
import Loading from '../../components/Loading';

// Redux
import { connect } from 'react-redux';
import {ActivityIndicator} from "react-native-paper";
import Single from "../Single";

const { width } = Dimensions.get("window");

class TabOne extends React.Component {

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
    moreInfos(){

        navigation.navigate('Single')



        /*let url = `https://www.cryptocompare.com/coins/${change.SYMBOL.toLowerCase()}/overview/${this.state.localCurrency}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));*/
    };


    componentDidMount(){
        this.setState({ favorites: this.props.favorites });
        this.props.navigation.setParams({ favorite: this.props.favorites[0] });
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                { this.props.changes !== null ? (
                    <TabContent change={this.props.changes[0]} />
                ):(
                    <Loading displayColor='#eb5085'/>
                )}
                <Text onPress={() => this.moreInfos(this.props.change) } style={{
                    width: ((width * 50) / 100),
                    alignSelf: 'center',
                    textAlign: 'center',
                    height: 40,
                    lineHeight: 35,
                    backgroundColor: '#252e47',
                    marginHorizontal: ((width * 10) / 100),
                    color: '#FFFFFF',
                    borderRadius: 20,
                    fontSize:15,
                    paddingHorizontal: 10,
                    marginTop:30,
                }}>Plus d'information</Text>
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

export default connect(mapStateToProps)(TabOne)