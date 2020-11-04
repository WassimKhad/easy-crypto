import React, { PropTypes } from "react";
import {View,Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions, StyleSheet, Linking, AsyncStorage} from "react-native";
import Api from '../../services/Api';
import Loading from '../../components/Loading';
import {AntDesign} from "@expo/vector-icons";

// Redux
import { connect } from 'react-redux';
import {changes,favoritesSave} from "../../redux/actions/ChangeActions";

const { width } = Dimensions.get("window");

class index extends React.Component {

    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        xTabTree: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateXTabTree: new Animated.Value(width*2),
        translateY: -1000,
        changes: null,
        changess: null,
        favorites: null,
        localCurrency: 'USD', // null
        localCurrencySymbol: '$' // null
    };
    API = new Api();

    componentDidMount(){
        this.init().then(()=>{

        });
    }

    async init(){
        await AsyncStorage.getItem('favorites').then((data) => {
            if( data == null ) {
                let favoritesData = require('../../assets/Favorites');
                AsyncStorage.setItem('favorites', JSON.stringify(favoritesData)).then(() => {
                    this.props.dispatch(favoritesSave(favoritesData));
                    this.setState({ favorites: favoritesData });
                    this.getData()

                })
                .catch((err) => {
                    alert(err);
                });
            } else {
                this.props.dispatch(favoritesSave(JSON.parse(data)));
                this.setState({ favorites: JSON.parse(data) });
                this.getData()
            }

        }).catch((err) => {
            alert(err);
        });
    }

    getData(){
        // Ici récupere d'abord la monnaie local apres les data des currencies

        this.API.getCurrencies('USD', this.props.favorites).then((response) => {

            let changesTmp = [];
            let i = 0;
            for (let key in response.data.RAW) {
                let fa = this.props.favorites.find(item => item.Symbol === key );
                let change = {
                    COINNAME: fa.CoinName,
                    SYMBOL : key,
                    CHANGE24HOUR: (parseInt(response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].CHANGE24HOUR, 10) / 100).toFixed(2),
                    OPEN24HOUR: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].OPEN24HOUR,
                    LASTUPDATE: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].LASTUPDATE,
                    PRICE: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].PRICE,
                    LOW24HOUR: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].LOW24HOUR,
                    HIGH24HOUR: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].HIGH24HOUR,
                    IMAGEURL: response.data.RAW[this.state.favorites[i].Symbol][this.state.localCurrency].IMAGEURL
                };

                changesTmp.push(change);
                i++;
            }

            this.props.dispatch(changes(changesTmp));
            this.setState({changes: changesTmp});
        });
    }

    moreInfos(change){
        let url = `https://www.cryptocompare.com/coins/${change.SYMBOL.toLowerCase()}/overview/${this.state.localCurrency}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    handleSlide = type => {

        Animated.spring(this.state.translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (this.state.active === 0) {
            Animated.parallel([
                Animated.spring(this.state.translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTree, {
                    toValue: (width * 2),
                    duration: 100
                }).start()
            ]);
        } else if (this.state.active === 1){
            Animated.parallel([
                Animated.spring(this.state.translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTree, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else if (this.state.active === 2){
            Animated.parallel([
                Animated.spring(this.state.translateXTabOne, {
                    toValue: -(width * 2),
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTwo, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(this.state.translateXTabTree, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };

    render() {
        let {
            xTabOne,
            xTabTwo,
            xTabTree,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateXTabTree,
            translateY,
            changes
        } = this.state;
        return (
            <View style={{ flex: 1}}>
                {this.state.changes != null ? (
                    <View style={{width: "100%"}}>
                        <View style={styles.view} >
                            <Animated.View
                                style={[styles.Animated,
                                    {transform: [
                                            {
                                                translateX
                                            }
                                        ]}
                                ]}
                            />
                            <TouchableOpacity
                                style={styles.TouchableOpacity}
                                onLayout={event =>
                                    this.setState({
                                        xTabOne: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 0 }, () =>
                                        this.handleSlide(xTabOne)
                                    )
                                }
                            >
                                <Image
                                    source={{ uri: `https://www.cryptocompare.com/${changes[0].IMAGEURL}` }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        marginBottom: 15
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.TouchableOpacity}
                                onLayout={event =>
                                    this.setState({
                                        xTabTwo: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 1 }, () =>
                                        this.handleSlide(xTabTwo)
                                    )
                                }
                            >
                                <Image
                                    source={{ uri: `https://www.cryptocompare.com/${changes[1].IMAGEURL}` }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        marginBottom: 15
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.TouchableOpacity}
                                onLayout={event =>
                                    this.setState({
                                        xTabTree: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 2 }, () =>
                                        this.handleSlide(xTabTree)
                                    )
                                }
                            >
                                <Image
                                    source={{ uri: `https://www.cryptocompare.com/${changes[2].IMAGEURL}` }}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 30,
                                        marginBottom: 15
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView scrollEnabled={false}>
                            <Animated.View
                                style={{
                                    transform: [
                                        {
                                            translateX: translateXTabOne
                                        },
                                        {
                                            translateY: 0
                                        }
                                    ]
                                }}
                                onLayout={event =>
                                    this.setState({
                                        translateY: event.nativeEvent.layout.height
                                    })
                                }
                            >
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
                                            { changes[0].COINNAME }
                                        </Text>
                                        <View style={{flex:1, flexDirection: 'column',justifyContent: 'space-between',alignItems: "center", height:60}}>
                                            <View style={{ position:'absolute', top:-5}}>
                                                <Icon change={changes[0]} />
                                            </View>
                                            <View style={{ position:'absolute', top:15 }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 25,
                                                    paddingRight: 1,
                                                    margin: 10,
                                                    color: '#252e47'
                                                }}>
                                                    { changes[0].CHANGE24HOUR } %
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
                                                { changes[0].PRICE } { this.state.localCurrencySymbol }
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
                                                { changes[0].OPEN24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[0].LOW24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[0].HIGH24HOUR } { this.state.localCurrencySymbol }
                                            </Text>
                                        </View>

                                    </View>
                                    <View>
                                        <Text onPress={() => this.moreInfos(changes[0]) } style={{
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

                            </Animated.View>

                            <Animated.View
                                style={{

                                    transform: [
                                        {
                                            translateX: translateXTabTwo
                                        },
                                        {
                                            translateY: -translateY
                                        }
                                    ]
                                }}
                                onLayout={event =>
                                    this.setState({
                                        translateY: event.nativeEvent.layout.height
                                    })
                                }
                            >
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
                                            { changes[1].COINNAME }
                                        </Text>
                                        <View style={{flex:1, flexDirection: 'column',justifyContent: 'space-between',alignItems: "center", height:60}}>
                                            <View style={{ position:'absolute', top:-5}}>
                                                <Icon change={changes[1]} />
                                            </View>
                                            <View style={{ position:'absolute', top:15 }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 25,
                                                    paddingRight: 1,
                                                    margin: 10,
                                                    color: '#252e47'
                                                }}>
                                                    { changes[1].CHANGE24HOUR } %
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
                                                { changes[1].PRICE } { this.state.localCurrencySymbol }
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
                                                { changes[1].OPEN24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[1].LOW24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[1].HIGH24HOUR } { this.state.localCurrencySymbol }
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text onPress={() => this.moreInfos(changes[1]) } style={{
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

                            </Animated.View>

                            <Animated.View
                                style={{

                                    transform: [
                                        {
                                            translateX: translateXTabTree
                                        },
                                        {
                                            translateY: -( translateY * 2 )
                                        }
                                    ]
                                }}
                                onLayout={event =>
                                    this.setState({
                                        translateY: event.nativeEvent.layout.height
                                    })
                                }
                            >
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
                                            { changes[2].COINNAME }
                                        </Text>
                                        <View style={{flex:1, flexDirection: 'column',justifyContent: 'space-between',alignItems: "center", height:60}}>
                                            <View style={{ position:'absolute', top:-5}}>
                                                <Icon change={changes[2]} />
                                            </View>
                                            <View style={{ position:'absolute', top:15 }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 25,
                                                    paddingRight: 1,
                                                    margin: 10,
                                                    color: '#252e47'
                                                }}>
                                                    { changes[2].CHANGE24HOUR } %
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
                                                { changes[2].PRICE } { this.state.localCurrencySymbol }
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
                                                { changes[2].OPEN24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[2].LOW24HOUR } { this.state.localCurrencySymbol }
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
                                                { changes[2].HIGH24HOUR } { this.state.localCurrencySymbol }
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text onPress={() => this.moreInfos(changes[2]) } style={{
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

                            </Animated.View>

                        </ScrollView>
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

const mapStateToProps = (state) => {
    return {
        changes: state.changeReducer.changes,
        favorites: state.changeReducer.favorites
    }
};

export default connect(mapStateToProps)(index);
const styles = StyleSheet.create({

    view : {
        flexDirection: "row",
        marginTop: 40,
        height: 36,
        position: "relative"
    },

    Animated: {
        position: "absolute",
        width: "33.33%",
        height: "100%",
        borderBottomColor: '#eb5085',
        borderBottomWidth: 3
    },
    TouchableOpacity: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});
