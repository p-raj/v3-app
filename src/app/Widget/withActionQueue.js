import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getDisplayName } from 'recompose';


export const withActionQueue = (executor) => (WrappedComponent) => {
    class WithActionQueue extends React.Component {
        render() {
            const {queue, ...passThroughProps} = this.props;

            // pending actions
            const actions = queue[executor] || [];
            return (
                <WrappedComponent
                    actions={actions}
                    {...passThroughProps}
                />
            );
        }
    }

    WithActionQueue.propTypes = {
        queue: PropTypes.object
    };
    WithActionQueue.displayName = `WithActionQueue(${getDisplayName(WrappedComponent)})`;
    return connect((store) => {
        return {
            queue: store.queue,
        }
    })(WithActionQueue);
};
