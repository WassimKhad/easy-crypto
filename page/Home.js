import React from 'react';
import AppTopNavigator from '../navigation/Tabs/AppTopNavigator';
import { bindActionCreators } from 'redux';
import {setCurrency, getFavorites, CurrenciesInit} from "../redux/actions/servicesActions";
import {connect} from "react-redux";

class Home extends React.Component {

    state= {
        changes: null,
        favorites: [],
        localCurrency: null
    };

    componentDidMount(){
        this.storage().then(()=> {
            this.init().then(()=>{
            });
        });
    }

    async storage(){
        this.props.actions.getFavorites('ok');
    }
    async init(){
        this.setState({ favorites: this.props.favorites });
        this.setState({ changes: this.props.changes });
        this.setState({ localCurrency: this.props.localCurrency });
        this.props.actions.set_currency(this.props.favorites);
        this.props.actions.currenciesInit();
    }
    render() {
        return (
            <AppTopNavigator />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        changes: state.changeReducer.changes,
        favorites: state.changeReducer.favorites,
        localCurrency: state.changeReducer.localCurrency
    }
};
const mapActionsToProps = (payload) => ({
    actions: {
        set_currency: bindActionCreators(setCurrency, payload),
        getFavorites: bindActionCreators(getFavorites, payload),
        currenciesInit: bindActionCreators(CurrenciesInit, payload),
    }
});
export default connect(mapStateToProps, mapActionsToProps)(Home);
