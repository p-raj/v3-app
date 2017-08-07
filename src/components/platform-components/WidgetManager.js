import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';

import Widget from './Widget';


/**
 * Responsibilities:
 * - Laying out widgets.
 * - Maintaining the theme
 * - Passing Data to/from Widgets
 */
class WidgetManager extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {runtime, session} = this.props;
        return {
            runtime,
            session
        };
    }

    render() {
        const widgets = this.props.widgets
            // temporary hack for
            .sort((w1, w2) => w1.index - w2.index)
            .map((widget) => {
                return <Widget
                    key={widget.url}
                    widget={widget}
                />
            });

        // TODO widget layouts!!
        return (
            <ScrollView style={{flex: 1}}>
                {widgets}
            </ScrollView>
        );
    }
}

WidgetManager.childContextTypes = {
    runtime: PropTypes.object,
    session: PropTypes.object
};

WidgetManager.propTypes = {
    widgets: PropTypes.arrayOf(PropTypes.object).isRequired,
    runtime: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
};

export default WidgetManager;
