/**
 * The Runtimes will have a Profile to be displayed.
 *
 * Let's just give it a button to get started for now.
 *
 * We'll maintain the state of the Runtime here,
 * whether the runtime has been initiated,
 * how many widgets have been resolved etc.
 *
 * This component might be the smartest as
 * well ugliest component in the history
 * of React based Applications.
 */
import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import WidgetContainer from './WidgetContainer';
import { widgetSuccess } from '../../redux/actions/widget';
import { clearSessionData, getSessionData } from '../../redux/actions/session';
import APIServerRequestViaClient from '../../v3-core/utils/network/APIServerRequestViaClient';
import { LIST_RUNTIMES } from '../../utils/endpoints';
import Request from 're-quests';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import { Redirect } from '../../v3-core/utils/router/index';
import theme from '../../utils/theme'
import NavBarComponent from '../ui-components/NavBarComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        width: '100%',
        height: '100%',
        paddingVertical: '2%',
        paddingHorizontal: '4%',
    }
});

class Runtime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initiated: false,
            closeSession: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <APIServerRequestViaClient
                    url={`${LIST_RUNTIMES}${this.props.runtime.uuid}/widgets/`}
                    method={'get'}
                    onSuccess={ (response) => {
                        this.setState({sessionId: response.headers["x-vrt-session"]});
                        this.props.dispatch(widgetSuccess(this.props.runtime, response));
                    }}>
                    <View>
                        <Request.Start>
                            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                <ActivityIndicator size={'large'} style={styles.activityIndicator}
                                                   color={theme.black}/>
                            </View>
                        </Request.Start>
                        <Request.Success>
                            <View style={styles.wrapper}>
                                <View style={{flex: 1.5}}>
                                    <NavBarComponent
                                        onCloseClicked={this.onAppClosed}
                                        onBackClicked={this.onBackClicked}/>
                                </View>
                                <View style={{flex: 9, alignItems: 'center'}}>
                                    <WidgetContainer
                                        session={this.getSession()}
                                        widgets={this.getWidgets()}
                                        runtime={this.props.runtime}/>
                                </View>
                            </View>
                        </Request.Success>
                    </View>

                </APIServerRequestViaClient>
                { this.state.closeSession &&
                <RequestProcess
                    name="session_cancel"
                    data={{uuid: this.state.sessionId}}>
                    <Request.Success>
                        <Redirect to={'/'}/>
                    </Request.Success>
                </RequestProcess>}
            </View>
        );
    }

    componentDidMount() {
        let timer = setInterval(() => {
            let session = this.getSession();

            if (session) {
                this.props.dispatch(getSessionData(session));
            }
        }, 3000);
        this.setState({timer: timer});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onBackClicked = () => {

    };

    onAppClosed = () => {
        // Clear session's data locally
        this.props.dispatch(clearSessionData(this.props.runtime));
        this.setState({closeSession: true});
    };

    getWidgets = () => {
        /*
         * FIXME
         * this might be a problem, should not expose
         * all the widgets (from all the runtimes) to this runtime :(
         * */
        const widgets = this.props.widgets[this.props.runtime.uuid];
        if (widgets && widgets.widgetAPI) {
            return widgets.widgetAPI.results;
        }
        return [];
    };

    getSession = () => {
        return this.props.widgets[this.props.runtime.uuid] ? this.props.widgets[this.props.runtime.uuid].session : undefined;
    }
}

Runtime.propTypes = {
    runtime: React.PropTypes.object.isRequired
};

Runtime = connect((store) => {
    return {
        auth: store.auth,
        widgets: store.widgets,
        componentData: store.componentData,
    }
})(Runtime);

export default Runtime;
