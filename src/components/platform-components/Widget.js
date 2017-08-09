import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { dequeueAction, enqueueAction } from '../../redux/actions/actionQueue';
import * as actions from '../../redux/actions/actions';
import updateComponentData from '../../redux/actions/updateComponentData';

import { toDotNotation } from '../../v3-core/utils';
import CompositeTemplate from '../../v3-core/components/dynamic/Template';


class Widget extends React.Component {
    // noinspection JSUnusedGlobalSymbols
    getChildContext() {
        const {componentData, widget} = this.props;
        const data = (componentData && componentData[widget.uuid]) ?
            componentData[widget.uuid] : {};

        // TODO
        // a possibility is if some component
        // accepts a dictionary, the dictionary
        // gets flattened out here
        const values = toDotNotation(data);

        return {
            values: values,
            widget: widget,
            setVariable: this.setVariable,
            enqueue: this.enqueue
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
        this.actionContext = {
            token: props.auth.access_token,
            widget: props.widget,
            runtime: context.runtime,
            session: context.session
        };
    }

    componentWillReceiveProps(nextProps) {
        const {componentData, widget} = this.props;

        const templateName = (componentData && componentData[widget.uuid]) ?
            componentData[widget.uuid].template || 'init' : 'init';

        const templateNameNew = (nextProps.componentData && nextProps.componentData[nextProps.widget.uuid]) ?
            nextProps.componentData[nextProps.widget.uuid].template || 'init' : 'init';
        const data = (nextProps.componentData && nextProps.componentData[widget.uuid]) ?
            nextProps.componentData[widget.uuid] || {} : {};
        const dotNotatedData = toDotNotation(data);
        // FIXME
        this.data = (templateName === templateNameNew) ? {...this.data, ...dotNotatedData} : {...dotNotatedData};
        if (this.data.template) {
            delete this.data.template;
            delete this.data['pre-render'];
            delete this.data['post-render'];
        }

        if (templateName !== templateNameNew) {
            const actions = widget.template[templateNameNew]['pre-render'] || [];
            actions.map((action) => {
                return this.execute(action);
            });
        }

        const queue = nextProps.actionQueue[this.props.widget.name] ? nextProps.actionQueue[this.props.widget.name].queue : [];
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
        const {componentData, widget} = this.props;
        const templateName = (componentData && componentData[widget.uuid]) ?
            componentData[widget.uuid].template || 'init' : 'init';
        // const sections = this.loadValues(widget.uuid, (template) ? template.sections : []);
        return (
            <View style={{flex: 1}}>

                {/*
                 * TODO:
                 * passing these arguments is definitely
                 * not the best way of integrating widget actions.
                 * But something is better than nothing to get started :/
                 *
                 * Ideal way:
                 * namespace variables while creating config from server side.
                 */}
                <CompositeTemplate template={widget.template} name={templateName}/>
            </View>
        );
    }

    componentDidMount() {
        const {componentData, widget} = this.props;
        const templateName = (componentData && componentData[widget.uuid]) ?
            componentData[widget.uuid].template || 'init' : 'init';
        const template = widget.template[templateName];
        const actions = template['pre-render'] || [];
        actions.map((action) => {
            return this.execute(action);
        });

        if (_.isEmpty(template) || _.isEmpty(template.sections) || _.isEmpty(template.sections[0].items)) return;

        const components = template.sections[0].items[0].components;

        for (let component of components) {
            if (!component.name) continue;

            this.props.dispatch(updateComponentData(this.props.widget.uuid, component.name, component.value));
        }
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
                this.props.dispatch(actions.execute(action, this.actionContext, data));
                break;
            case '$set':
                // Set the properties to be changed in local state
                // A change in state will trigger re-render and so will the loadValues method
                // But this time loadValues will also load the properties to be changed
                this.data[action.options.key] = action.options.value;
                this.props.dispatch(actions.execute(action, this.actionContext, data));
                break;
            case '$get':
                // Set the properties to be changed in local state
                // A change in state will trigger re-render and so will the loadValues method
                // But this time loadValues will also load the properties to be changed
                this.data[action.options.as] = toDotNotation(this.data)[action.options.key];
                this.props.dispatch(actions.execute(action, this.actionContext, data));
                break;
            case '$operation':
                // Set the properties to be changed in local state
                // A change in state will trigger re-render and so will the loadValues method
                // But this time loadValues will also load the properties to be changed
                this.props.dispatch(actions.execute(action, this.actionContext, this.data));
                break;
            default:
                this.props.dispatch(actions.execute(action, this.actionContext, this.data));
                break;
        }
    };

    enqueue = (action) => {
        this.props.dispatch(enqueueAction(action, this.props.widget.name, this.data))
    };

    setVariable = (name, data) => {
        this.data[name] = data;

        // this is fine, the above logic is required for
        // destructing data while performing operation
        // this.props.dispatch(updateComponentData(this.props.widget.name, name, data));
    };
}

Widget.childContextTypes = {
    values: PropTypes.object,
    widget: PropTypes.object,
    setVariable: PropTypes.func,
    enqueue: PropTypes.func,
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


Widget = connect((store) => {
    return {
        auth: store.auth,
        componentData: store.componentData,
        actionQueue: store.actionQueue,
    }
})(Widget);

export default Widget;
