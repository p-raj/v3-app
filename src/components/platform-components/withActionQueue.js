import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getDisplayName } from '../../v3-core/utils';

/**
 * Extract current hacky logics to separate manageable HOC,
 * & make it easier to fix.
 *
 * Input:
 *  Queue
 *
 * Output:
 *  Data understood/required by Widget.
 *  - Template
 *  - Data/Values
 *
 * Data Categorization:
 * --------------------
 *
 * data          - data from the session/responses
 * context       - data from the client: eg. user input, & user information
 * environment   - info like widget/process/session/runtime
 */
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
