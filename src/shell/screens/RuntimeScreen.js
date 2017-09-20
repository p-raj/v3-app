import queryString from 'query-string';
import Request from 're-quests';
import React from 'react';
import RN, { Text, View } from 'react-native';

import { connect, Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import thunk from 'redux-thunk';

import reducer from 'app/redux/reducers';
import Runtime from 'app/Runtime';

import storage from 'extensions/storage';
import { withAuthentication } from 'shell/components/hoc/Auth';
import HorizontalLayout from 'components/HorizontalLayout';
import RequestProcess from 'shell/utils/network/RequestProcess';

const getAppDB = (app) => (state = {}) => {
    const appConfig = {
        ...offlineConfig,
        persistOptions: {
            keyPrefix: `${app.uuid}--`,
            storage: storage
        }
    };
    return createStore(
        reducer,
        state,
        compose(
            applyMiddleware(thunk),
            offline(appConfig)
        ));
};


class RuntimeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runtime: undefined
        }
    }

    render() {
        const resource = queryString.parse(this.props.location.search);
        return (
            <RequestProcess
                name={'get_application'}
                data={{
                    uuid: this.props.match.params.id,
                    'VERIS-RESOURCE': `Veris ${resource.auth}`
                }}
                onSuccess={this.onRuntimeFetched}>
                <HorizontalLayout
                    style={{flex: 1}}>
                    <Request.Start>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <RN.ActivityIndicator size={'large'} color="black"/>
                            <Text style={{fontSize: 18, fontWeight: '400'}}>
                                Loading Application
                            </Text>
                        </View>
                    </Request.Start>
                    {this.state.runtime &&
                    <Request.Success>
                        <Provider store={this.store}>
                            <Runtime runtime={this.state.runtime}/>
                        </Provider>
                    </Request.Success>
                    }
                </HorizontalLayout>
            </RequestProcess>
        );
    }

    onRuntimeFetched = (response) => {
        // FIXME
        const resource = queryString.parse(this.props.location.search);
        const splits = resource.auth.split(':');
        this.store = getAppDB(response.data)({
            auth: this.props.auth,
            memberships: {
                selected: {
                    uuid: splits[3],
                    organization: {
                        uuid: splits[1]
                    }
                }
            }
        });
        this.setState({
            runtime: response.data
        });
    }
}

RuntimeScreen = connect((store) => {
    return {
        auth: store.auth,
        membership: store.memberships.selected
    }
})(RuntimeScreen);


export default withAuthentication(RuntimeScreen);