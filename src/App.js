import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import PickerContainer from './components/PickerContainer';
import store from './redux/store';
import HomeScreen from './screens/HomeScreen';
import RuntimeScreen from './screens/RuntimeScreen';
import { Route, Router } from './v3-core/utils/router';


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
