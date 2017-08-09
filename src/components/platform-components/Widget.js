import _ from 'lodash';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { dequeueAction, enqueueAction } from '../../redux/actions/actionQueue';
import * as actions from '../../redux/actions/actions';

import { toDotNotation } from '../../v3-core/utils';
import CompositeTemplate from '../../v3-core/components/dynamic/Template';
import { withWidgetData } from './withWidgetData';
import { withWidgetTemplate } from './withWidgetTemplate';


class Widget extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {widget} = this.props;

        return {
            widget: widget,
            setVariable: this.setVariable,
            enqueue: this.enqueue,
            perform: this.enqueue
        };
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            propChange: {}
        };

        this.data = {};
        this.intervals = [];

        // FIXME:
        // remove hardcoded data :/
        this.env = {
            widget: props.widget,
            runtime: context.runtime,
            session: context.session
        };
    }

    componentWillReceiveProps(nextProps) {
        const {templateName, widget} = this.props;

        const data = (nextProps.componentData && nextProps.componentData[widget.uuid]) ?
            nextProps.componentData[widget.uuid] || {} : {};
        const dotNotatedData = toDotNotation(data);
        // FIXME
        this.data = (templateName === nextProps.templateName) ?
            {...this.data, ...dotNotatedData} : {...dotNotatedData};
        if (this.data.template) {
            delete this.data.template;
            delete this.data['pre-render'];
            delete this.data['post-render'];
        }

        const queue = nextProps.actionQueue[this.props.widget.name] ?
            nextProps.actionQueue[this.props.widget.name].queue : [];
        if (_.isEmpty(queue))
            return;
        // We do not loop over actionQueue.
        // We just execute the action in the front of the queue actionQueue[0]
        // and dispatch dequeueAction() which will remove the currently executed action.
        // A change in props.actionQueue will trigger componentWillReceiveProps again
        // This way we don't have to use loops instead we rely on react component's lifecycle
        let payload = queue[0];
        this.execute(payload.action, payload.data);
        this.props.dispatch(dequeueAction(this.props.widget.name));
    }

    render() {
        const {template, templateName} = this.props;
        const t = {
            sections: this.findPropertyChanges(template[templateName])
        };
        return (
            <View style={{flex: 1}}>
                <CompositeTemplate template={t} name={templateName}/>
            </View>
        );
    }

    componentWillUnmount() {
        this.intervals.map((id) => {
            return clearInterval(id);
        });
    }

    execute = (action, data) => {
        const {repeat, ...act} = action;

        // periodic tasks
        if (repeat) {
            this.intervals.push(setInterval(() => {
                this.execute(act, data);
            }, repeat));
        }

        switch (action.type) {
            case '$prop.change':
                // Set the properties to be changed in local state
                // A change in state will trigger re-render and so will the loadValues method
                // But this time loadValues will also load the properties to be changed
                this.setState({
                    propChange: {
                        componentName: action.options.componentName,
                        // FIXME: JUGAAD
                        property: {...action.options.property, ...data}
                    }
                });
                this.props.dispatch(actions.execute(action, this.env, data));
                break;
            case '$set':
                this.data[action.options.key] = action.options.value;
                this.props.dispatch(actions.execute(action, this.env, data));
                break;
            case '$get':
                this.data[action.options.as] = toDotNotation(this.data)[action.options.key];
                this.props.dispatch(actions.execute(action, this.env, data));
                break;
            case '$operation':
                this.props.dispatch(actions.execute(action, this.env, this.data));
                break;
            default:
                this.props.dispatch(actions.execute(action, this.env, this.data));
                break;
        }
    };

    enqueue = (action) => {
        this.props.dispatch(enqueueAction(action, this.props.widget.name, this.data))
    };

    setVariable = (name, data) => {
        this.data[name] = data;
        console.log(this.data)

        // this is fine, the above logic is required for
        // destructing data while performing operation
        // this.props.dispatch(updateComponentData(this.props.widget.name, name, data));
    };

    /**
     * This method takes in jasonette schema (sections) of a widget
     * insert new properties into a component (effect of $prop.change)
     * @param sections
     * @returns sections with components having a value key
     */
    findPropertyChanges = ({sections}) => {
        if (!sections) return [];
        const changeProperty = (component) => {
            if (!component.name) return;
            if (this.state.propChange.componentName && this.state.propChange.componentName === component.name) {
                _.merge(component, this.state.propChange.property);
            }
        };

        const traverseComponents = (item) => {
            if (!item.components) {
                changeProperty(item);
                return;
            }
            for (let component of item.components) {
                traverseComponents(component);
            }
        };

        for (let section of sections) {
            for (let item of section.items) {
                traverseComponents(item);
            }
        }
        return sections;
    };
}

Widget.childContextTypes = {
    values: PropTypes.object,
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
            auth: store.auth,
            actionQueue: store.actionQueue,
        }
    }),
    withWidgetData,
    withWidgetTemplate
);

export default enhanced(Widget);
