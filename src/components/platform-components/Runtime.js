import React from 'react';
import { connect } from 'react-redux';
import {
    Dimensions, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator,
    TextInput
} from 'react-native';

import { Label } from 're-render';
import WidgetContainer from './WidgetContainer';
import { widgetSuccess } from '../../redux/actions/widget';
import { clearSessionData, getSessionData } from '../../redux/actions/session';
import APIServerRequestViaClient from '../../v3-core/utils/network/APIServerRequestViaClient';
import { LIST_RUNTIMES } from '../../utils/endpoints';
import Request from 're-quests';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import { Redirect } from '../../v3-core/utils/router/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../utils/theme'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import StarRatingComponent from '../../v3-core/components/ui/StarRating/index';
const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        maxWidth: 860,
        width: width,
        height: height,
    },
    wrapper: {
        maxWidth: 860,
        width: width,
        height: height,
        padding: 10,

        // center the logo in this container :/
        alignItems: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        color: theme.black,
        backgroundColor: 'transparent',
        padding: 10,
        fontSize: theme.h4
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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
                {
                    this.state.initiated ||
                    <View style={{flex: 1}}>
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({closeSession: true})
                            }} style={{position: 'absolute', top: width * 0.05, right: width * 0.04, zIndex: 6,}}>
                                <Icon name="close" size={28}/>
                            </TouchableOpacity>
                            <Image
                                source={{uri: `${this.props.runtime.logo}`}}
                                style={{
                                    borderRadius: 45,
                                    backgroundColor: theme.black,
                                    height: 90,
                                    width: 90,
                                    marginBottom: 20,
                                    marginTop: 40
                                }}/>
                            <Text
                                style={{margin: theme.marginLarge, fontSize: theme.h0}}>{this.props.runtime.name}</Text>
                        </View>
                        <View style={{
                            padding: 10,
                            borderColor: theme.black,
                            borderWidth: 1,
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0
                        }}>
                            <TouchableOpacity
                                style={[styles.buttonContainer]}
                                onPress={() => {
                                    this.setState({initiated: true});
                                }}>
                                <Text style={styles.buttonText}>
                                    Get Started
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                { this.state.initiated && <APIServerRequestViaClient
                    url={`${LIST_RUNTIMES}${this.props.runtime.uuid}/widgets/`}
                    method={'get'}
                    onSuccess={ (response) => {
                        this.setState({sessionId: response.headers["x-vrt-session"]});
                        this.props.dispatch(widgetSuccess(this.props.runtime, response));
                    }}>
                    <View>
                        <Request.Start>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0
                            }}>
                                <ActivityIndicator size={'large'} style={styles.activityIndicator}
                                                   color={theme.black}/>
                            </View>
                        </Request.Start>

                        <Request.Success>
                            <View style={styles.wrapper}>
                                <WidgetContainer
                                    session={this.getSession()}
                                    widgets={this.getWidgets()}
                                    runtime={this.props.runtime}/>
                                <View style={{
                                    padding: 10,
                                    borderColor: theme.black,
                                    borderWidth: 1,
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity
                                        style={[styles.buttonContainer, {
                                            borderRightWidth: 1,
                                            padding: 5,
                                            alignSelf: 'center',
                                            borderColor: theme.black
                                        }]}
                                        onPress={this.onRuntimeFinished}>
                                        <Text style={[styles.buttonText, {
                                            padding: 5,
                                            textAlign: 'center',
                                        }]}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonContainer]}
                                        onPress={() => this.onRuntimeFinished(true)}>
                                        <Text style={styles.buttonText}>
                                            Done
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Request.Success>
                        <Request.Error>
                            <Label value={'Error getting widgets'}/>
                        </Request.Error>
                    </View>

                </APIServerRequestViaClient> }
                { this.state.closeSession &&
                this.state.initiated &&
                <RequestProcess
                    name="session_cancel"
                    data={{uuid: this.state.sessionId}}
                    onSuccess={(response) => {
                    }}>
                    <Request.Success>
                        <Redirect to={'/'}/>
                        {this.onRuntimeFinished()}
                    </Request.Success>
                </RequestProcess>}
                { this.state.showFeedbackWidget &&
                this.state.initiated &&
                <RequestProcess
                    name="get_feedback_widget"
                    onSuccess={(response) => {
                        this.setState({feedbackWidget: response.data});
                        this.popupDialog.show();
                    }}>
                    <View>

                    </View>
                </RequestProcess>}
                {
                    this.state.closeSession && !this.state.initiated && <Redirect to={'/'}/>
                }

                <PopupDialog
                    style={{
                        flex: 1,
                        position: 'absolute',
                        zIndex: 3,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        alignItems: 'center',
                    }}
                    width={width * 0.8}
                    height={height * 0.5}
                    dialogTitle={<DialogTitle title="Lets rate the application"/>}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}>
                    <View style={{justifyContent: 'space-between', flex: 1}}>
                        {/*{this.state.feedbackWidget && <Widget*/}
                        {/*key={this.state.feedbackWidget.url}*/}
                        {/*widget={this.state.feedbackWidget}*/}
                        {/*session={this.getSession()}*/}
                        {/*widgets={this.getWidgets()}*/}
                        {/*/>}*/}
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            maxWidth: '80%',
                            alignSelf: 'center'
                        }}>

                            <Text style={{color: theme.black, fontSize: theme.h5, marginVertical: 10}}>
                                Appreciate the app creator by praising their work and giving them 5 stars. If you
                                don't like something, you can write a review and we'll instantly let them know.
                            </Text>
                            <StarRatingComponent
                                ratingGiven={(rating) => this.setState({
                                    rating: rating
                                })}
                            />
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                placeholder={"Want to add some review?"}
                                style={{
                                    borderWidth: 1,
                                    borderColor: theme.black,
                                    height: 60,
                                    marginVertical: 20,
                                    width: '100%'
                                }}
                                onChangeText={(review) => this.setState({review})}
                                value={this.state.review}/>
                        </View>
                        <View style={{
                            padding: 10,
                            borderColor: theme.black,
                            borderWidth: 1,
                            flexDirection: 'row',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <RequestProcess
                                name="Rate App"
                                defer={true}
                                ref={req => this.submitFeedback = req}
                                data={{rating: this.state.rating, comment: this.state.review}}
                                onSuccess={() => this.popupDialog.dismiss()}
                                onError={() => this.popupDialog.dismiss()}
                                onFaliure={() => this.popupDialog.dismiss()}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Request.RenderIf stateIn={[0, 2, 4]}>
                                        <TouchableOpacity
                                            style={[styles.buttonContainer, {
                                                borderColor: theme.black
                                            }]}
                                            onPress={() => {
                                                this.setState({has_feedback: true});
                                                this.submitFeedback.getWrappedInstance().fire()
                                            }}>
                                            <Text style={[styles.buttonText, {
                                                padding: 5,
                                                textAlign: 'center',
                                            }]}>
                                                Submit
                                            </Text>
                                        </TouchableOpacity>
                                    </Request.RenderIf>
                                    <Request.Start>
                                        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                            <ActivityIndicator size={'large'} style={styles.activityIndicator}
                                                               color={theme.black}/>
                                        </View>
                                    </Request.Start>
                                </View>
                            </RequestProcess>
                        </View>

                    </View>
                </PopupDialog>
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

    onRuntimeFinished = (showFeedback) => {
        // this.setState({initiated: false});
        // let session = this.getSession();

        // Send current session's data to server
        // this.props.dispatch(sendSessionData(session, this.props.componentData, this.props.auth.access_token));
        if (showFeedback.toString() === "true") {
            this.setState({showFeedbackWidget: true});
            return;
        }
        this.props.dispatch(clearSessionData(this.props.runtime));
        this.setState({initiated: false, closeSession: true});
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
