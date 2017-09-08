import React from 'react';
import { connect } from 'react-redux';

import loadPersistentData from '../../../redux/actions/storage';


export function withPersistentStorage(WrappedComponent) {
    class withPersistentStorage extends React.Component {
        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {storage, ...passThroughProps} = this.props;

            // wait for persistent storage
            // to boot up before rendering any component
            // TODO show loading component till then
            if (!storage) {
                return null;
            }

            return (
                <WrappedComponent {...passThroughProps}/>
            );
        }

        componentDidMount() {
            if (this.props.storage) return;
            // Dispatch action to
            // load data from storage
            this.props.dispatch(loadPersistentData());
        }
    }

    withPersistentStorage.displayName = `WithPersistentStorage(${getDisplayName(WrappedComponent)})`;
    return connect((store) => {
        return {
            storage: store.storage
        }
    })(withPersistentStorage);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
