import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { Route, Router } from 'extensions/router';

import RuntimeScreen from 'shell/screens/RuntimeScreen';
import PickerContainer from 'shell/components/platform-components/PickerContainer';
import store from 'shell/redux/store';
import HomeScreen from 'shell/screens/HomeScreen';


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <View style={{flex: 1}}>
                        <Route exact={true} path='/' component={HomeScreen}/>
                        <Route exact={true} path='/applications/:id' component={RuntimeScreen}/>
                        <PickerContainer/>
                    </View>
                </Router>
            </Provider>
        );
    }
}

export default App;
