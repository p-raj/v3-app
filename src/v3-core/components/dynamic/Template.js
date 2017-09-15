import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'recompose';
import Renderer from './Renderer';
import { dequeue } from '../../../redux/actions/app/queue';
import * as actions from '../../../redux/actions/app/actions';
import { withActionQueue } from '../../../components/platform-components/withActionQueue';


/**
 * A template can either be a JSON
 * or a valid URL to a JSON, which will be
 * rendered by the WidgetLayout.
 */
class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            propChange: {}
        }
    }

    static defaultProps = {
        // TODO path to a default error template
        template: {}
    };
    static contextTypes = {
        perform: PropTypes.func,
    };

    componentWillReceiveProps(nextProps) {
        const {template} = this.props;

        // reference check is not enough
        if (JSON.stringify(template) !== JSON.stringify(nextProps.template)) {
            const actions = nextProps.template['pre-render'] || [];
            actions.map((action) => {
                return this.context.perform(action);
            });
        }

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
        const {template} = this.props;
        if (typeof template === 'string') {
            return <TemplateResolver url={template}/>;
        }

        const sections = this.findPropertyChanges(template.sections || []);
        return <Renderer sections={sections}/>
    }

    componentDidMount() {
        const {template} = this.props;
        const actions = template['pre-render'] || [];
        actions.map((action) => {
            return this.context.perform(action);
        });
    }

    execute = (action, context, data) => {
        switch (action.type) {
            case '$prop.change':
                // Set the properties to be changed in local state
                // A change in state will trigger re-render and so will the loadValues method
                // But this time loadValues will also load the properties to be changed
                // FIXME
                this.setState({
                    propChange: {
                        componentName: action.options.componentName,
                        property: {...action.options.property, ...data}
                    }
                });
                this.props.dispatch(actions.execute(action, context, data));
                break;
            default:
                this.props.dispatch(actions.execute(action, context, data));
        }
    };

    /**
     * This method takes in jasonette schema (sections) of a widget
     * insert new properties into a component (effect of $prop.change)
     * @param sections
     * @returns sections with components having a value key
     */
    findPropertyChanges = (sections) => {
        if (!sections) return [];
        if (_.isEmpty(this.state.propChange)) return sections;

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
        return [...sections];
    }
}

Template.propTypes = {
    actions: PropTypes.array.isRequired,
    template: PropTypes.oneOf([
        PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.shape({
                items: PropTypes.arrayOf(PropTypes.shape({
                    type: PropTypes.string.isRequired
                })).isRequired
            })),
            'pre-render': PropTypes.arrayOf(PropTypes.shape({
                type: PropTypes.string.isRequired,
                options: PropTypes.object
            }))
        }),
        PropTypes.string
    ]).isRequired
};

const TemplateResolver = () => {
    // TODO
    // retrieve & save the template for later use
    console.error('`TemplateResolver` has not been implemented yet');
    return <Template template={{}}/>
};

TemplateResolver.propTypes = {
    url: PropTypes.string.isRequired
};


class CompositeTemplate extends React.PureComponent {
    render() {
        const {template, name} = this.props;
        let EnhancedTemplate = compose(
            withActionQueue('template')(Template)
        );

        if (name && template[name]) {
            console.warn('Deprecated template layout structure!');
            console.warn('Composite template structure detected, ' +
                'switch to individual templates!');
            return <EnhancedTemplate template={template[name]}/>
        }

        return <EnhancedTemplate template={template}/>
    }
}

CompositeTemplate.propTypes = {
    template: PropTypes.object.isRequired,
    name: PropTypes.string
};

export default CompositeTemplate;