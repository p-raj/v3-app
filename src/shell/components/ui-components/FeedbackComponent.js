import React from 'react';
import {
    Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator,
    TextInput
} from 'react-native';

import Request from 're-quests';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import theme from '../../utils/theme'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import StarRatingComponent from '../../v3-core/components/ui/StarRating';
const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        maxWidth: 860,
        width: width,
        height: height,
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

class FeedbackComponent extends React.Component {
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

}

export default FeedbackComponent;
