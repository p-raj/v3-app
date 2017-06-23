import * as _ from 'lodash';
import Request from 're-quests';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Platform } from 'react-native';
import { Redirect } from '../../v3-core/utils/router';
import RequestProcess from '../../v3-core/utils/network/RequestProcess';
import theme from '../../utils/theme'
import IconComponent from '../../components/ui-components/IconComponent';
import SortableGrid from 'react-native-sortable-grid'
import { connect } from 'react-redux';
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import { selectMembership } from '../../redux/actions/membership';
import OrganizationComponent from '../../components/ui-components/OrganizationComponent';


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
                <View style={{flex: 1, backgroundColor: 'red'}}>
                    <OrganizationComponent organizationName={value.organization.name}
                                           image={value.organization.avatar}
                                           date={value.created_at}/>
                </View>
                <View style={{flex: 5, backgroundColor: 'steelblue'}}>
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

        )
    }

    onMembershipSelected = (membership) => {
        this.props.dispatch(selectMembership(membership));
    };


}

OrganizationPane = connect((state) => {
    return {
        auth: state.auth,
        membership: state.memberships.selected,
        memberships: state.memberships.results || []
    }
})(OrganizationPane);

export default withAuthentication(OrganizationPane);


