import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toDotNotation } from '../../v3-core/utils/index';

/**
 * Extract current hacky logics to separate manageable HOC,
 * & make it easier to fix.
 *
 * Input:
 *  Data from Push/Response/Session/Callback or any other event
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
export function withWidgetData(WrappedComponent) {
    class WithWidgetData extends React.Component {
        // noinspection JSUnusedGlobalSymbols
        getChildContext() {
            const {data, widget} = this.props;

            // TODO
            // a possibility is if some component
            // accepts a dictionary, the dictionary
            // gets flattened out here
            const values =
                toDotNotation(
                    data &&
                    data[widget.uuid] ?
                        data[widget.uuid] : {}
                );

            return {
                values: values
            };
        }

        render() {
            const {data, ...passThroughProps} = this.props;
            const {widget} = this.props;

            // data contains data for all the widgets
            const widgetData = (data && data[widget.uuid]) ?
                data[widget.uuid] || {} : {};

            // componentData for backwards compatibility
            return (
                <WrappedComponent
                    data={widgetData}
                    componentData={widgetData}
                    {...passThroughProps}
                />
            );
        }
    }

    WithWidgetData.childContextTypes = {
        values: PropTypes.object
    };
    WithWidgetData.displayName = `WithWidgetData(${getDisplayName(WrappedComponent)})`;
    return connect((store) => {
        return {
            data: store.componentData,
        }
    })(WithWidgetData);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
