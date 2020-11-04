import React from 'react';
import {Image, StatusBar} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TabOne from "../../page/FavoritesTabs/TabOne";
import TabTwo from "../../page/FavoritesTabs/TabTwo";
import TabTree from "../../page/FavoritesTabs/TabTree";

const TabScreen = createMaterialTopTabNavigator(
    {
        TabOne: {
            screen: TabOne,
            navigationOptions: {
                title:null,

            }
        },
        TabTwo: {
            screen: TabTwo,
            navigationOptions: {
                title:null,
            }
        },
        TabTree: {
            screen: TabTree,
            navigationOptions: {
                title:null,
            }
        },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            showIcon: true,
            showLabel:false,
            //activeTintColor: '#eb5085',
            //inactiveTintColor: '#F8F8F8',
            style: {
                backgroundColor: '#FFFFFF',
                marginTop: StatusBar.currentHeight
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#eb5085',
                borderBottomWidth: 2,
            },
        },
    }
);
//making a StackNavigator to export as default
const rootTopNavigation = createStackNavigator({
    TabScreen: {
        screen: TabScreen,
        navigationOptions: {
            header: null,
        },
    },
});

export default rootTopNavigation;