import React from 'react';
import RN from 'react-native';
import Request from 're-quests';
import { connect } from 'react-redux';

import * as STATE from 're-quests/dist/States';

import HorizontalLayout from '../../v3-core/components/layouts/HorizontalLayout/index';
import { LIST_RUNTIMES } from '../../utils/endpoints';
import { saveRuntimes } from '../../redux/actions/runtime';
import APIServerRequestViaClient from '../../v3-core/utils/network/APIServerRequestViaClient';

import Runtime from './Runtime';


/**
 * RuntimeContainer is responsible for loading/refreshing all
 * the runtimes from the redux store/network for a given container.
 *
 * RuntimeContainer should be a smart component i.e. it should directly query the store,
 * find out the selected membership & load all runtimes corresponding to the membership.
 *
 * ** The component will always be able to read the selected membership,
 * or else it should log a warning.
 *
 */
class RuntimeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            membership: null
        }
    }

    render() {
        const runtimes = this.props.runtimes.map((runtime) => {
            return <Runtime
                key={runtime.url}
                runtime={runtime}
            />
        });

        return (
            <APIServerRequestViaClient
                url={LIST_RUNTIMES}
                ref={(request) => {
                    this.request = request;
                }}
                onSuccess={this.onRuntimesFetched}>
                <HorizontalLayout style={{height: '87%'}}>
                    <Request.RenderIf stateIn={[STATE.INIT]}>
                        <RN.ActivityIndicator />
                    </Request.RenderIf>
                    <Request.RenderIf stateIn={[STATE.SUCCESS]}>
                        <RN.ScrollView horizontal>
                            {runtimes}
                        </RN.ScrollView>
                    </Request.RenderIf>
                    <Request.RenderIf stateIn={[STATE.FAILURE, STATE.ERROR]}>
                        <RN.Text>Something Went Wrong</RN.Text>
                    </Request.RenderIf>
                </HorizontalLayout>
            </APIServerRequestViaClient>
        );
    }

    /**
     * componentWillReceiveProps() is invoked before a mounted component receives new props.
     * If you need to update the state in response to prop changes (for example, to reset it),
     * you may compare this.props and nextProps and perform state
     * transitions using this.setState() in this method.
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        // we will always update the state of
        // the runtime container to match the store state
        const membership = nextProps.activeMembership;

        // Note that React may call this method even if the props have not changed,
        // so make sure to compare the current and next values if you
        // only want to handle changes.
        // This may occur when the parent component causes your component to re-render.
        // So we won't trigger a state change when its the same
        // if (membership === this.state.membership) return;
        this.setState({
            membership: membership
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeMembership === prevProps.activeMembership) {
            return;
        }

        // TODO
        // make sure the current component receives
        // the membership information
        // lets make this component dumb again
        if (!this.state.membership) return;
        this.request.getWrappedInstance().fire();
    }

    onRuntimesFetched = (response) => {
        this.props.dispatch(saveRuntimes(response.data));
    }
}


RuntimeContainer = connect((store) => {
    return {
        // to prevent the unnecessary null checks
        runtimes: store.runtimes.results || [],
        activeMembership: store.runtimes.selected
    }
})(RuntimeContainer);

export default RuntimeContainer;
