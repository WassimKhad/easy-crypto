import React from 'react';
import {View, FlatList, ActivityIndicator, AsyncStorage} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import PropTypes from 'prop-types';
import {AntDesign} from "@expo/vector-icons";
// Actions
import {ToggleFavorite} from "../redux/actions/ChangeActions";
import {SaveFavorites} from "../redux/actions/servicesActions";

class AddFavorites extends React.Component {


    state = {
        loading: true,
        data: [],
        favorites: [],
        cryptoCurrencies: []
    };

    cryptoCurrencies = [];

    componentDidMount() {
        this.setState({cryptoCurrencies: this.props.cryptoCurrencies})
        this.setState({favorites: this.props.favorites});
        this.cryptoCurrencies = this.props.cryptoCurrencies;
        this.setState({
            data: this.props.cryptoCurrencies,
            loading: false,
        });
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.cryptoCurrencies.filter(item => {
            const itemData = `${item.CoinName.toUpperCase()} ${item.Symbol.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                noIcon
                placeholder="Recherche"
                searchIcon={{ size: 25, background:'#252e47', color:'#eb5085' }}
                placeholderTextColor={'#252e47'}
                inputStyle={{width: '100%', height:50, margin:0, color:'#252e47', fontSize:20}}
                lightTheme
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
                containerStyle={{backgroundColor: '#FFFFFF'}}
            />
        );
    };

    isFavorite(row){
        let favoriteIndex = this.state.favorites.findIndex(item => item.Symbol === row.Symbol);
        if(favoriteIndex !== -1){
            return true
        } else {
            return false
        }
    }

    toggleFavorites(item){

        this.setState({loading: true});
        this.props.actions.toggleFavorite(item);

        if(!this.isFavorite(item)){
            let favoritesTmp = this.props.favorites;
            favoritesTmp.push(item)
            this.props.actions.saveFavorites(favoritesTmp);
        }

        this.props.navigation.goBack();

    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: `https://www.cryptocompare.com/${item.ImageUrl}` } }}
                            title={item.CoinName}
                            subtitle={item.Symbol}
                            rightTitle={
                                <View>
                                    <AntDesign name='heart' size={25} color={ this.isFavorite(item) ? '#eb5085': '#a2a2a2'} onPress={ ()=> this.toggleFavorites(item) }/>
                                </View>
                            }
                            onLongPress={() => this.toggleFavorites(item) }
                        />
                    )}
                    keyExtractor={item => item.Symbol}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };
}

const mapStateToProps = (state) => {
    return {
        favorites: state.changeReducer.favorites,
        cryptoCurrencies: state.changeReducer.cryptoCurrencies,
    }
};
const mapActionsToProps = (payload) => ({
    actions: {
        toggleFavorite: bindActionCreators(ToggleFavorite, payload),
        saveFavorites: bindActionCreators(SaveFavorites, payload),
        //currenciesInit: bindActionCreators(CurrenciesInit, payload),
    }
});
export default connect(mapStateToProps, mapActionsToProps)(AddFavorites)