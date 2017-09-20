import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { ScrollView } from 'react-native';
import { ThemeProvider } from 'react-css-themr';

import Widget from 'app/Widget';
import { withActionQueue } from 'app/Widget/withActionQueue';
import * as Action from 'app/redux/actions/actions';
import { dequeue } from 'app/redux/actions/queue';


/**
 * Responsibilities:
 * - Laying out widgets.
 * - Maintaining the theme
 * - Passing Data to/from Widgets
 */
class WidgetManager extends React.Component {
    constructor(props) {
        super(props);
        this.intervals = [];
        // moving it to render causes the widgets to be re-created
        // https://github.com/facebook/react/issues/8669
        this.widgets = props.widgets
        // FIXME temporary hack for widget ordering
            .sort((w1, w2) => w1.index - w2.index)
            .map((widget) => {
                const EnhancedWidget = compose(
                    withActionQueue(widget.name)(Widget)
                );

                return <EnhancedWidget
                    key={widget.url}
                    widget={widget}
                />
            });
    }

    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {runtime, session} = this.props;
        return {
            runtime,
            session
        };
    }

    componentWillReceiveProps(nextProps) {
        const {actions, dispatch} = nextProps;

        if (actions.length === 0) {
            return;
        }

        // execute the first action
        // & remove it from the queue
        // debugger;
        let action = actions[0];
        this.execute(action.action, action.context, action.data);
        dispatch(dequeue(action.action, action.context, action.data));
    }

    render() {
        // TODO widget layouts!!
        const rootStyle = this.props.theme.root || {flex: 1};
        return (
            <ThemeProvider theme={this.props.theme}>
                <ScrollView style={rootStyle}>
                    {this.widgets}
                </ScrollView>
            </ThemeProvider>
        );
    }

    componentWillUnmount() {
        this.intervals.map((id) => {
            return clearInterval(id);
        });
    }

    execute = (action, context, data) => {
        const {repeat, ...act} = action;

        // periodic tasks
        if (repeat) {
            this.intervals.push(setInterval(() => {
                this.execute(act, context, data);
            }, repeat));
        }

        switch (action.type) {
            default:
                this.props.dispatch(Action.execute(action, context, this.data));
                break;
        }
    };
}

WidgetManager.childContextTypes = {
    runtime: PropTypes.object,
    session: PropTypes.string
};

WidgetManager.propTypes = {
    actions: PropTypes.array.isRequired,
    widgets: PropTypes.arrayOf(PropTypes.object).isRequired,
    runtime: PropTypes.object.isRequired,
    session: PropTypes.string.isRequired,
    theme: PropTypes.object
};

WidgetManager.defaultProps = {
    theme: {}
};

export default WidgetManager;
