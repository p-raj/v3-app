import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

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
 */
export function withWidgetTemplate(WrappedComponent) {
    class WithWidgetTemplate extends React.Component {
        render() {
            const {data, ...passThroughProps} = this.props;
            const {widget} = this.props;

            // for backwards compatibility :/
            const templateName = (data && data[widget.uuid]) ?
                data[widget.uuid].template || 'init' : 'init';

            return (
                <WrappedComponent
                    template={widget.template}
                    templateName={templateName}
                    {...passThroughProps}
                />
            );
        }
    }

    WithWidgetTemplate.childContextTypes = {
        values: PropTypes.object
    };
    WithWidgetTemplate.displayName = `WithWidgetTemplate(${getDisplayName(WrappedComponent)})`;
    return connect((store) => {
        return {
            data: store.componentData,
        }
    })(WithWidgetTemplate);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
