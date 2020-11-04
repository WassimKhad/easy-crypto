import React from 'react';
import {Dimensions, Linking, Text, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import Loading from "./Loading";
import Single from '../page/Single';


const { width } = Dimensions.get("window");

class TabContent extends React.Component {

    state = {
        change: null,
        /*changes: [],
        favorites: []*/
    };

    componentDidMount(){
        this.setState({change: this.props.change});
    }

    //moreInfos(change){
    moreInfos(){

        this.props.navigator.push({
            title: "Secure Page",
            component: Single,
            //passProps: {username: this.state.username, password: this.state.password},
        });

        /*let url = `https://www.cryptocompare.com/coins/${change.SYMBOL.toLowerCase()}/overview/${this.state.localCurrency}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));*/
    };

    render() {
        return (
            <View style={{ flex: 1}}>
                { this.props.change != null ? (
                    <View>
                        <View style={{
                            marginHorizontal: ((width * 15) / 100),
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: 'row',
                            marginTop:15
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 40,
                                color: '#252e47'
                            }}>
                                { this.props.change.COINNAME }
                            </Text>
                            <View style={{flex:1, flexDirection: 'column',justifyContent: 'space-between',alignItems: "center", height:60}}>
                                <View style={{ position:'absolute', top:-5}}>
                                    <Icon change={this.props.change} />
                                </View>
                                <View style={{ position:'absolute', top:15 }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 25,
                                        paddingRight: 1,
                                        margin: 10,
                                        color: '#252e47'
                                    }}>
                                        { this.props.change.CHANGE24HOUR } %
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            marginHorizontal: ((width * 10) / 100),
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: 'row',
                            borderColor: '#eb5085',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            marginTop:30
                        }}>
                            <View style={{width: (width/2),flex:1, flexDirection: 'column',alignItems: "flex-start",}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    color: '#252e47'
                                }}>
                                    Prix:
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'column',alignItems: "flex-start"}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    paddingRight: 1,
                                    margin: 10,
                                    color: '#252e47'
                                }}>
                                    { this.props.change.PRICE }
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            marginHorizontal: ((width * 10) / 100),
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: 'row',
                            borderColor: '#eb5085',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            marginTop:30
                        }}>
                            <View style={{width: (width/2),flex:1, flexDirection: 'column',alignItems: "flex-start",}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    color: '#252e47'
                                }}>
                                    Ouvert 24h:
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'column',alignItems: "flex-start"}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    paddingRight: 1,
                                    margin: 10,
                                    color: '#252e47'
                                }}>
                                    { this.props.change.OPEN24HOUR }

                                </Text>
                            </View>
                        </View>

                        <View style={{
                            marginHorizontal: ((width * 10) / 100),
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: 'row',
                            borderColor: '#eb5085',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            marginTop:30
                        }}>
                            <View style={{width: (width/2),flex:1, flexDirection: 'column',alignItems: "flex-start",}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    color: '#252e47'
                                }}>
                                    Low 24h:
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'column',alignItems: "flex-start"}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    paddingRight: 1,
                                    margin: 10,
                                    color: '#252e47'
                                }}>
                                    { this.props.change.LOW24HOUR }
                                </Text>
                            </View>
                        </View>

                        <View style={{
                            marginHorizontal: ((width * 10) / 100),
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: 'row',
                            borderColor: '#eb5085',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            marginTop:30
                        }}>
                            <View style={{width: (width/2),flex:1, flexDirection: 'column',alignItems: "flex-start",}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    color: '#252e47'
                                }}>
                                    High 24h:
                                </Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'column',alignItems: "flex-start"}}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 25,
                                    paddingRight: 1,
                                    margin: 10,
                                    color: '#252e47'
                                }}>
                                    { this.props.change.HIGH24HOUR }

                                </Text>
                            </View>
                        </View>
                        <View>
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
                    </View>
                ):(
                    <Loading displayColor='#eb5085' />
                )}
            </View>
        );
    }
}

export const Icon = (props) => {
    let CHANGE24HOUR = Number(props.change.CHANGE24HOUR);

    if(CHANGE24HOUR === 0){
        return (
            <AntDesign name='minus' size={30} color='#00D661' />
        )
    } else if(CHANGE24HOUR < 0){
        return (
            <AntDesign name='caretdown' size={30} color='#e50914' />
        )
    } else if(CHANGE24HOUR > 0){
        return (
            <AntDesign name='caretup' size={30} color='#00D661' />
        )
    }
};

export default TabContent;