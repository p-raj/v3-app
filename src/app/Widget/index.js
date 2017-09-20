import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as actions from 'app/redux/actions/actions';
import { dequeue, enqueue } from 'app/redux/actions/queue';
import { withWidgetData } from 'app/Widget/withWidgetData';
import { withWidgetTemplate } from 'app/Widget/withWidgetTemplate';

import CompositeTemplate from 'app/Template';
import { toDotNotation } from 'utils/index';


class Widget extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {widget} = this.props;

        return {
            widget: widget,
            setVariable: this.setVariable,
            enqueue: this.perform,
            perform: this.perform
        };
    }

    constructor(props, context) {
        super(props, context);
        this.data = {};
        this.intervals = [];

        // FIXME:
        // remove hardcoded data :/
        this._context = {
            widget: props.widget,
            runtime: context.runtime,
            session: context.session
        };
    }

    componentWillReceiveProps(nextProps) {
        const {templateName, widget} = this.props;

        const data = (nextProps.data && nextProps.data[widget.uuid]) ?
            nextProps.data[widget.uuid] || {} : {};
        const dotNotatedData = toDotNotation(data);
        // FIXME
        this.data = (templateName === nextProps.templateName) ?
            {...this.data, ...dotNotatedData} : {...dotNotatedData};
        if (this.data.template) {
            delete this.data.template;
            delete this.data['pre-render'];
            delete this.data['post-render'];
        }

        // FIXME
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
        const {template, templateName} = this.props;
        return (
            <CompositeTemplate template={template} name={templateName}/>
        );
    }

    componentWillUnmount() {
        this.intervals.map((id) => {
            return clearInterval(id);
        });
    }

    perform = (action) => {
        this.props.dispatch(enqueue(action, this._context, this.data))
    };

    setVariable = (name, data) => {
        this.data[name] = data;
    };

    execute = (action, context, data) => {
        const {repeat, ...act} = action;

        // periodic tasks
        if (repeat) {
            this.intervals.push(setInterval(() => {
                this.execute(act, context, data);
            }, repeat));
        }

        switch (action.type) {
            case '$template':
                this.props.dispatch({
                    type: action.type,
                    payload: {
                        action,
                        context,
                        data
                    }
                });
                this.props.dispatch(actions.execute(action, context, data));
                break;
            case '$set':
                this.data[action.options.key] = action.options.value;
                this.props.dispatch(actions.execute(action, context, data));
                break;
            case '$get':
                this.data[action.options.as] = toDotNotation(this.data)[action.options.key];
                this.props.dispatch(actions.execute(action, context, data));
                break;
            default:
                this.props.dispatch(actions.execute(action, context, this.data));
                break;
        }
    };

}

Widget.childContextTypes = {
    widget: PropTypes.object,
    setVariable: PropTypes.func,
    enqueue: PropTypes.func,
    perform: PropTypes.func
};

Widget.contextTypes = {
    runtime: PropTypes.object,
    session: PropTypes.string
};

Widget.propTypes = {
    widget: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        template: PropTypes.object
    }).isRequired
};

const enhanced = compose(
    connect((store) => {
        return {
            auth: store.auth
        }
    }),
    withWidgetData,
    withWidgetTemplate
);

export default enhanced(Widget);
