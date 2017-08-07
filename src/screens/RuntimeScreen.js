import React from 'react';
import RN, { Text, View } from 'react-native';
import HorizontalLayout from '../v3-core/components/layouts/HorizontalLayout';
import Request from 're-quests';
import Runtime from '../components/platform-components/Runtime';
import { withAuthentication } from '../v3-core/components/hoc/Auth';
import RequestProcess from '../v3-core/utils/network/RequestProcess';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import  queryString from 'query-string';
import { selectMembership } from '../redux/actions/membership';


class RuntimeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runtime: undefined
        }
    }

    render() {
        const resource = queryString.parse(this.props.location.search);
        // TODO
        // remove me
        const splits = resource.auth.split(':');
        this.props.dispatch(selectMembership({
            uuid: splits[3],
            organization: {
                uuid: splits[1]
            }
        }));

        return (
            <RequestProcess
                name={"get_application"}
                data={{
                    uuid: this.props.match.params.id,
                    "VERIS-RESOURCE": `Veris ${resource.auth}`
                }}
                onSuccess={this.onRuntimeFetched}>
                <HorizontalLayout
                    style={{flex: 1}}>
                    <Request.Start>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <RN.ActivityIndicator size={"large"} color="black"/>
                            <Text style={{fontSize: 18, fontWeight: '400'}}>
                                Loading Application
                            </Text>
                        </View>
                    </Request.Start>
                    {!_.isEmpty(this.state.runtime) &&
                    <Request.Success>
                        <Runtime runtime={this.state.runtime}/>
                    </Request.Success>
                    }
                </HorizontalLayout>
            </RequestProcess>
        );
    }

    onRuntimeFetched = (response) => {
        this.setState({
            runtime: response.data
        });
    }
}

RuntimeScreen = connect((store) => {
    return {
        auth: store.auth,
    }
})(RuntimeScreen);


export default withAuthentication(RuntimeScreen);