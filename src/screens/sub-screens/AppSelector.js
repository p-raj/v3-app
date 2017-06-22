import * as _ from 'lodash';
import Request from 're-quests';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { Redirect } from '../../v3-core/utils/router';
import RequestProcess from '../../utils/RequestProcess';
import theme from '../../common/theme'
import IconComponent from '../screen-components/IconComponent';
import SortableGrid from 'react-native-sortable-grid'
import CarouselComponent from '../screen-components/CarouselComponent';
import { connect } from 'react-redux';
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import { saveMemberships, selectMembership } from '../../redux/actions/membership';
import OrganizationComponent from '../screen-components/OrganizationComponent';


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
    }
});
const {height, width} = Dimensions.get('window');

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
                <View key={key.toString()} style={[styles.container]}>
                    <View style={{
                        flex: 3,
                        marginTop: (Platform.OS === 'android') ? height * 0.02 : height * 0.1,
                        marginBottom: (Platform.OS === 'android') ? height * 0.02 : height * 0.1
                    }}>
                        <OrganizationComponent organizationName={value.organization.name}
                                               image={value.organization.avatar}
                                               date={value.created_at}/>
                    </View>
                    <View style={{
                        flex: 14, ...Platform.select({
                            web: {
                                minHeight: height * 0.48,
                            }
                        })
                    }}>
                        <RequestProcess name="get_applications"
                                        data={{"VERIS-RESOURCE": `Veris organization:${value.organization.uuid}:member:${value.uuid}`}}
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
                                    <View style={[{flex: 1}]}>
                                        <SortableGrid
                                            blockTransitionDuration={ 400 }
                                            activeBlockCenteringDuration={ 200 }
                                            itemsPerRow={ 3 }
                                            dragActivationTreshold={ 200 }
                                            onDragRelease={ (itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder) }
                                            onDragStart={ () => console.log("Some block is being dragged now!") }>

                                            {
                                                this.state[`application-${key}-data`].map((data, index) => {
                                                    return (
                                                        <View key={index}
                                                              style={{justifyContent: 'center', alignItems: 'center'}}>
                                                            <IconComponent imageUrl={data.logo} iconText={data.name}
                                                                           iconSize={75}
                                                                           showImage={true}
                                                                           onIconPress={() => {
                                                                               this.onMembershipSelected(value);
                                                                               this.setState({
                                                                                   applicationUUID: data.uuid,
                                                                                   redirect: true,
                                                                                   membershipKey: key
                                                                               })
                                                                           }}/>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </SortableGrid>
                                    </View>


                                </Request.Success>}
                            </View>
                        </RequestProcess>
                    </View>
                </View>
            );
        });
    };

    render() {
        let search = `?auth=organization:${this.state[`organization-${this.state.membershipKey}-uuid`]}:member:${this.state[`membership-${this.state.membershipKey}-uuid`]}`;
        return (
            <RequestProcess
                name={'list_user_memberships'}
                data={{member_user_uuid: this.props.auth.uuid}}
                onSuccess={this.onMembershipsFetched}>
                <View style={styles.container}>
                    <Request.Start>
                        <View
                            style={{
                                flex: 1, justifyContent: 'center', alignItems: 'center', ...Platform.select({
                                    web: {
                                        minHeight: height,
                                    }
                                })
                            }}>
                            <ActivityIndicator size={'large'} color={theme.black}/>
                            <Text style={styles.loadingText}>Fetching Memberships</Text>
                        </View>
                    </Request.Start>
                    <Request.Success>
                        <View style={styles.container}>
                            {this.state.redirect &&
                            <Redirect push to={{
                                pathname: `applications/${this.state.applicationUUID}`,
                                search: search
                            }}/>}
                            {this.getOrganizations().length > 0 ?
                                <CarouselComponent>
                                    {this.getOrganizations()}
                                </CarouselComponent> : null}
                        </View>
                    </Request.Success>
                </View>
            </RequestProcess>

        )
    }

    onMembershipsFetched = (response) => {
        this.props.dispatch(saveMemberships(response.data));
    };
    onMembershipSelected = (membership) => {
        this.props.dispatch(selectMembership(membership));
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


