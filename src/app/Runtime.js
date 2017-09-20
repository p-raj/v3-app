import PropTypes from 'prop-types';
import Request from 're-quests';
import React from 'react';

import { ActivityIndicator, StyleSheet, Text, View, } from 'components';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import WidgetManager from 'app/WidgetManager';
import { withActionQueue } from 'app/Widget/withActionQueue';
import { clearAppData } from 'app/redux/actions/appData';
import { getSessionData } from 'app/redux/actions/session';
import { widgetSuccess } from 'app/redux/actions/widget';

import { LIST_RUNTIMES } from 'shell/utils/endpoints';
import APIServerRequestViaClient from 'shell/utils/network/APIServerRequestViaClient';
import RequestProcess from 'shell/utils/network/RequestProcess';
import { Redirect } from 'extensions/router';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1
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
        const {runtime} = this.props;
        const EnhancedWidgetManager = compose(
            withActionQueue(runtime.uuid)(WidgetManager)
        );

        return (
            <View style={styles.container}>
                <APIServerRequestViaClient
                    url={`${LIST_RUNTIMES}${this.props.runtime.uuid}/widgets/`}
                    method={'get'}
                    onSuccess={(response) => {
                        this.setState({sessionId: response.headers['x-vrt-session']});
                        this.props.dispatch(widgetSuccess(this.props.runtime, response));
                    }}>
                    <View style={{flex: 1}}>
                        <Request.Start>
                            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                <ActivityIndicator size={'large'} style={styles.activityIndicator}/>
                                <Text style={{fontSize: 18, fontWeight: '400'}}>
                                    Fetching Widgets
                                </Text>
                            </View>
                        </Request.Start>
                        <Request.Success>
                            <View style={styles.wrapper}>
                                <EnhancedWidgetManager
                                    session={this.getSession()}
                                    widgets={this.getWidgets()}
                                    runtime={this.props.runtime}/>
                            </View>
                        </Request.Success>
                    </View>
                </APIServerRequestViaClient>
                {
                    this.state.closeSession &&
                    <RequestProcess
                        name="session_cancel"
                        data={{uuid: this.state.sessionId}}>
                        <Request.Success>
                            <Redirect to={'/'}/>
                        </Request.Success>
                    </RequestProcess>
                }
            </View>
        );
    }

    componentDidMount() {
        let timer = setInterval(() => {
            let session = this.getSession();

            if (session) {
                this.props.dispatch(getSessionData(session));
            }
        }, 30000);
        this.setState({timer: timer});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        this.props.dispatch(clearAppData(this.props.runtime));
    }

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
        return this.props.widgets[this.props.runtime.uuid] ?
            this.props.widgets[this.props.runtime.uuid].session : undefined;
    }
}

Runtime.propTypes = {
    runtime: PropTypes.object.isRequired
};

Runtime = connect((store) => {
    return {
        auth: store.auth,
        widgets: store.widgets
    }
})(Runtime);

export default Runtime;


/**
 *
 * System Process implementation for api used above to get widgets, doesn't works as of now because it doesn't return session ID
 * Issue from backend (A.P.'s side)
 *
 <RequestProcess
 name="get_application_widgets"
 data={{
        uuid: this.props.runtime.uuid,
        'VERIS-RESOURCE': `Veris organization:${this.props.membership.organization.uuid}:member:${this.props.membership.uuid}`

    }}
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
 <View style={{flex: 0.5}}>
 <NavBarComponent
 appName={this.props.runtime.name}
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
 </RequestProcess>
 **/