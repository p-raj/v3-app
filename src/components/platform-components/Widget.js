import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import _ from 'lodash';

import WidgetLayout from '../../v3-core/components/dynamic/WidgetLayout';
import * as actions from '../../redux/actions/actions';
import updateComponentData from '../../redux/actions/updateComponentData';
import { dequeueAction, enqueueAction } from '../../redux/actions/actionQueue';
import { Spinner } from 're-render';
import { toDotNotation } from '../../v3-core/utils';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: width
    }
});


/**
 * Widget is responsible for laying out components
 * and defining actions.
 *
 * Everything here will be extremely dynamic.
 * & possibly very ugly,
 * even uglier than the Runtime component :D
 *
 * Analogy:
 * Widget (Web Page) ==> Schema (JS) + Layout (CSS) + Components (HTML)
 *
 */
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

    constructor(props) {
        super(props);
        this.state = {
            propChange: {}
        };

        this.data = {};

        // FIXME:
        // remove hardcoded data :/
        this.actionContext = {
            token: props.auth.access_token,
            runtime: props.runtime,
            widget: props.widget,
            session: props.session,
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
        const template = widget.template[templateName];

        const sections = this.loadValues(widget.uuid, (template) ? template.sections : []);

        if (templateName === 'init' && this.props.widgetState[this.props.widget.uuid] === 'loading') {
            return (
                <Spinner size={20}/>
            )
        }

        return (
            <View style={styles.container}>

                {/*
                 * TODO:
                 * passing these arguments is definitely
                 * not the best way of integrating widget actions.
                 * But something is better than nothing to get started :/
                 *
                 * Ideal way:
                 * namespace variables while creating config from server side.
                 */}
                <WidgetLayout
                    sections={sections}/>
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
            this.execute(action);
        });

        if (_.isEmpty(template) || _.isEmpty(template.sections) || _.isEmpty(template.sections[0].items)) return;

        const components = template.sections[0].items[0].components;

        for (let component of components) {
            if (!component.name) continue;

            this.props.dispatch(updateComponentData(this.props.widget.uuid, component.name, component.value));
        }
    }

    execute = (action, data) => {
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
                this.data[action.options.as] = this.data[action.options.key];
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

    /**
     * This method takes in jasonette schema (sections) of a widget
     * and inserts the previously filled values (componentData)
     * into it and returns the populated sections.
     * It is also used to insert new properties into a component (effect of $change.property)
     * @param widgetUuid
     * @param sections
     * @returns sections with components having a value key
     */
    loadValues = (widgetUuid, sections) => {
        // const widgetData = toDotNotation(componentData[widgetUuid]);
        const mergeComponentData = (component) => {
            if (!component.name) return;
            // This check is required bcoz when a widget is resolved and its ui switched,
            // its new component's values will be overwritten to undefined
            // if (widgetData && widgetData[component.name]) {
            //     component['value'] = widgetData[component.name];
            // }

            // If the current component has some component's property change pending
            // then merge those properties into this component
            if (this.state.propChange.componentName && this.state.propChange.componentName === component.name) {
                _.merge(component, this.state.propChange.property);
            }
        };

        const traverseComponents = (item) => {
            if (!item.components) {
                mergeComponentData(item);
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
};

Widget.propTypes = {
    widget: PropTypes.object.isRequired
};


Widget = connect((store) => {
    return {
        auth: store.auth,
        componentData: store.componentData,
        widgetState: store.widgetState,
        actionQueue: store.actionQueue,
    }
})(Widget);

export default Widget;
