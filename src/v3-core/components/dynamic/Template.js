import PropTypes from 'prop-types';
import React from 'react';
import Renderer from './Renderer';


/**
 * A template can either be a JSON
 * or a valid URL to a JSON, which will be
 * rendered by the WidgetLayout.
 */
const Template = ({template, ...props}) => {
    if (typeof template === 'string') {
        return <TemplateResolver url={template}/>;
    }

    const sections = template.sections || [];
    return <Renderer sections={sections}/>
};

Template.defaultProps = {
    // TODO path to a default error template
    template: {}
};

Template.propTypes = {
    template: PropTypes.oneOf(
        PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.shape({
                items: PropTypes.arrayOf(PropTypes.shape({
                    type: PropTypes.string.isRequired
                })).isRequired
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