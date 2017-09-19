import * as _ from 'lodash';

import Request from 're-quests';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Grid from 'react-native-grid-component';

import { Redirect } from 'extensions/router';
import RequestProcess from 'shell/v3-core/utils/network/RequestProcess';
import theme from 'shell/utils/theme'
import { withAuthentication } from 'shell/v3-core/components/hoc/Auth';
import { selectMembership } from 'shell/redux/actions/membership';
import OrganizationComponent from 'shell/components/ui-components/OrganizationComponent';
import ImageIconComponent from 'shell/components/ui-components/ImageIconComponent';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    grid: {
        flex: 1,
        justifyContent: 'space-around'
    },
    organizationName: {
        fontSize: theme.h0,
        color: theme.black,
        marginTop: theme.marginNormal,
        backgroundColor: 'transparent',
        fontWeight: '700',
        flex: 1,
    },
    membershipInfo: {
        fontSize: theme.h4,
        marginTop: theme.marginLarge,
        color: theme.black,
        backgroundColor: 'transparent'
    },
    image: {
        borderRadius: 35,
        backgroundColor: theme.black,
        height: 70,
        width: 70,
    },
    activityIndicator: {
        alignSelf: 'center',
    },
    loadingText: {
        fontSize: theme.h5,
        color: theme.black,
        backgroundColor: 'transparent'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class OrganizationPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        let search = `?auth=organization:${this.state[`organization-${this.state.membershipKey}-uuid`]}:member:${this.state[`membership-${this.state.membershipKey}-uuid`]}`;
        let key = this.props.key || 0;
        let value = this.props.value || {};
        return (
            <View key={key.toString()} style={[styles.container]}>
                {this.state.redirect &&
                <Redirect push to={{
                    pathname: `applications/${this.state.applicationUUID}`,
                    search: search
                }}/>}
                <View style={{flex: 2, padding: '5%'}}>
                    <OrganizationComponent organizationName={value.organization.name}
                                           image={value.organization.avatar}
                                           date={value.created_at}/>
                </View>
                <View style={{flex: 5, paddingTop: 20}}>
                    <RequestProcess name="get_applications"
                                    tag={`get-applications-${value.organization.uuid}`}
                                    cache={30}
                                    data={{'VERIS-RESOURCE': `Veris organization:${value.organization.uuid}:member:${value.uuid}`}}
                                    onSuccess={(response) => {
                                        this.setState({
                                            [`application-${key}-data`]: response.data.results,
                                            [`membership-${key}-uuid`]: value.uuid,
                                            [`organization-${key}-uuid`]: value.organization.uuid,
                                        })
                                    }}>
                        <View style={{flex: 1}}>
                            <Request.Start>
                                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                                    <ActivityIndicator size={'large'} style={styles.activityIndicator}
                                                       color={theme.black}/>
                                    <Text style={styles.loadingText}>Loading Apps</Text>
                                </View>
                            </Request.Start>
                            {!_.isEmpty(this.state[`application-${key}-data`]) &&
                            <Request.Success>
                                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                                    <Grid
                                        style={{flex: 1, justifyContent: 'space-around', backgroundColor: 'orange'}}
                                        renderPlaceholder={(items) => {
                                            if (items === 1 || items === 2) {
                                                return <View style={{flex: 1}} key={`key-${items}`}/>
                                            }
                                        }}
                                        renderItem={(data, index) => {
                                            return (
                                                <View key={index} style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <ImageIconComponent imageUrl={data.logo}
                                                                        iconText={data.name}
                                                                        onIconPress={() => {
                                                                            this.onMembershipSelected(value);
                                                                            this.setState({
                                                                                applicationUUID: data.uuid,
                                                                                redirect: true,
                                                                                membershipKey: key
                                                                            })
                                                                        }}/>
                                                </View>
                                            );

                                        }}
                                        data={this.state[`application-${key}-data`]}
                                        itemsPerRow={3}
                                    />
                                </View>
                            </Request.Success>}
                        </View>
                    </RequestProcess>
                </View>
            </View>
        )
    }

    onMembershipSelected = (membership) => {
        this.props.dispatch(selectMembership(membership));
    };


}

OrganizationPane = connect((state) => {
    return {
        auth: state.auth
    }
})(OrganizationPane);

export default withAuthentication(OrganizationPane);


