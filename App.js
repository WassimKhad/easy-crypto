import React from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
    
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2036',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
