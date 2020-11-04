import React from 'react';
import {Alert, View, FlatList, Linking, Button} from 'react-native';
import { ListItem } from 'react-native-elements';
import {AntDesign} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

// Redux
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';

// Actions
import {DeleteFavorite} from "../redux/actions/ChangeActions";
import {SaveFavorites} from "../redux/actions/servicesActions";

class Favorites extends React.Component {

    static navigationOptions = (data) => {
        const { navigation, state } = data;
        return {
            title: 'Mes favoris',
            headerRight: (
                <Icon size={35} name={'ios-add'} style={{color:'#FFF', marginRight:20, fontWeight:'bold', fontSize:35}} onPress={() => {
                    if (navigation.state.params.favoritesCount < 3) {
                        navigation.push('AddFavorites');
                    } else {
                        alert('Désolé, vous avez atteint le nombre maximum de trois (3) favoris');
                    }
                }}/>
            )
        }
    };


    state= {
        changes: null,
        favorites: [],
        localCurrency: null
    };

    componentDidMount() {
        let lenght= 0;
        if( this.props.favorites != null ){
            lenght = this.props.favorites.length
        }
        this.props.navigation.setParams({ favoritesCount: lenght });
        this.setState({favorites: this.props.favorites});
    }

    delete = (Symbol) => {
        Alert.alert(
            'Attention',
            'Voulez vous vraiment supprimer votre favoris ?',
            [
                {
                    text: 'NON',
                    style: 'cancel',
                },
                {
                    text: 'OUI',
                    onPress: () => {
                        this.props.actions.deleteFavorite(Symbol);
                        this.props.actions.saveFavorites(this.props.favorites);
                        this.props.navigation.setParams({ favoritesCount: this.props.favorites.length });

                        console.log(this.props.favorites.length)
                    }
                },
            ],
            {cancelable: false},
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationEvents />
                <FlatList
                    data={this.props.favorites}
                    renderItem={({ item }) => (
                        <ListItem
                            leftAvatar={{ source: { uri: `https://www.cryptocompare.com/${item.ImageUrl}` } }}
                            title={item.CoinName}
                            subtitle={item.Symbol}
                            rightTitle={
                                <View>
                                    <AntDesign name='delete' size={25} color={"#eb5085"} onPress={ ()=> this.delete(item.Symbol) }/>
                                </View>
                            }
                            onLongPress={() => this.delete(item.Symbol) }
                        />
                    )}
                    keyExtractor={item => item.Symbol}
                    ItemSeparatorComponent={this.renderSeparator}
                    //ListHeaderComponent={this.renderHeader}
                />
                <Button title='tiitit' onPress={()=> console.log(this.props.favorites) } />
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
    }
};
const mapActionsToProps = (payload) => ({
    actions: {
        deleteFavorite: bindActionCreators(DeleteFavorite, payload),
        saveFavorites: bindActionCreators(SaveFavorites, payload),
    }
});
export default connect(mapStateToProps, mapActionsToProps)(Favorites)
