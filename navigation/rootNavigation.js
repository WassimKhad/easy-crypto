import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import Home from "../page/Home";
import Favorites from "../page/Favorites";
import AddFavorites from "../page/AddFavorites";
import About from "../page/About";
import Single from "../page/Single";

const favoritesNavigator = createStackNavigator(
    {
        Favorites: {
            screen: Favorites
        },
        AddFavorites: {
            screen: AddFavorites
        }
    },
    {
        initialRouteName: 'Favorites',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#252e47',
            },
            headerTintColor: '#f0edf6',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }
);
const rootNavigation = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Accueil',
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name='home' size={25} color={tintColor}/>
                ),
            }
        },
        Favorites: {
            screen: favoritesNavigator,
            navigationOptions: {
                tabBarLabel: 'Favoris',
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name='staro' size={25} color={tintColor}/>
                ),
            }
        },
        About: {
            screen: About,
            navigationOptions: {
                tabBarLabel: 'À propos',
                tabBarIcon: ({ tintColor }) => (
                    <AntDesign name='eyeo' size={25} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: 'Home',
        inactiveColor: '#f0edf6',
        activeColor: '#eb5085',
        barStyle: { backgroundColor: '#252e47' }
    }
);

export default rootNavigation;