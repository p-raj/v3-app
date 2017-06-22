import React from 'react';
import { ScrollView } from 'react-native';

import Widget from './Widget';


/**
 * WidgetContainer gets all the widgets to be
 * rendered from the Runtime.
 */
class WidgetContainer extends React.Component {
    render() {
        const widgets = this.props.widgets
            .sort((w1, w2) => w1.index - w2.index)
            .map((widget) => {
                return <Widget
                    key={widget.url}
                    widget={widget}
                    session={this.props.session}
                    runtime={this.props.runtime}
                />
            });

        return (
            <ScrollView>
                {widgets}
            </ScrollView>
        );
    }
}

export default WidgetContainer;
