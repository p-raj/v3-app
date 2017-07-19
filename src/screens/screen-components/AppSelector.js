import Request from 're-quests';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Platform } from 'react-native';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import theme from '../../utils/theme'
import CarouselComponent from '../../v3-core/components/ui/CarouselComponent';
import { connect } from 'react-redux';
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import { saveMemberships } from '../../redux/actions/membership';
import OrganizationPane from './OrganizationPane';
import * as _ from 'lodash';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        flex: 1,
        justifyContent: 'space-between'
    },
    organizationName: {
        fontSize: (Platform.OS === 'android') ? theme.h0 : theme.h1,
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
    organizationBlock: {
        flex: 1,
        marginVertical: theme.paddingLarge,
        padding: 10,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class AppSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    getOrganizations = () => {
        return this.props.memberships.map((value, key) => {
            return (
                <View style={styles.container}>
                    <OrganizationPane key={key} value={value}/>
                </View>
            );
        });
    };

    render() {
        if (!_.isEmpty(this.props.memberships)) {
            return (
                <View style={styles.container}>
                    {this.getOrganizations().length > 0 ?
                        <View style={{flex: 1}}>
                            <CarouselComponent>
                                {this.getOrganizations()}
                            </CarouselComponent>
                        </View> : null}
                </View>
            )
        }
        return (
            <RequestProcess
                name={'list_user_memberships'}
                data={{member_user_uuid: this.props.auth.uuid}}
                onSuccess={this.onMembershipsFetched}>
                <View style={styles.container}>
                    <Request.Start>
                        <View
                            style={styles.loadingContainer}>
                            <ActivityIndicator size={'large'} color={theme.black}/>
                            <Text style={styles.loadingText}>Fetching Memberships</Text>
                        </View>
                    </Request.Start>
                </View>
            </RequestProcess>
        )
    }

    onMembershipsFetched = (response) => {
        this.props.dispatch(saveMemberships(response.data));
    };
}

AppSelector = connect((state) => {
    return {
        auth: state.auth,
        membership: state.memberships.selected,
        memberships: state.memberships.results || []
    }
})(AppSelector);

export default withAuthentication(AppSelector);


