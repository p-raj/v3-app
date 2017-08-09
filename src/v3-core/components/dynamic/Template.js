import PropTypes from 'prop-types';
import React from 'react';
import Renderer from './Renderer';


/**
 * A template can either be a JSON
 * or a valid URL to a JSON, which will be
 * rendered by the WidgetLayout.
 */
class Template extends React.Component {
    static defaultProps = {
        // TODO path to a default error template
        template: {}
    };
    static contextTypes = {
        perform: React.PropTypes.func,
    };

    componentWillReceiveProps(nextProps) {
        const {template} = this.props;

        // reference check is enough
        if (template !== nextProps.template) {
            const actions = nextProps.template['pre-render'] || [];
            actions.map((action) => {
                return this.context.perform(action);
            });
        }
    }

    render() {
        const {template} = this.props;
        if (typeof template === 'string') {
            return <TemplateResolver url={template}/>;
        }

        const sections = template.sections || [];
        return <Renderer sections={sections}/>
    }

    componentDidMount() {
        const {template} = this.props;
        const actions = template['pre-render'] || [];
        actions.map((action) => {
            return this.context.perform(action);
        });
    }
}

Template.propTypes = {
    template: PropTypes.oneOf(
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
    ).isRequired
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


const CompositeTemplate = ({template, name}) => {
    if (name && template[name]) {
        console.warn('Deprecated template layout structure!');
        console.warn('Composite template structure detected, ' +
            'switch to individual templates!');
        return <Template template={template[name]}/>
    }

    return <Template template={template}/>
};

CompositeTemplate.propTypes = {
    template: PropTypes.object.isRequired,
    name: PropTypes.string
};

export default CompositeTemplate;