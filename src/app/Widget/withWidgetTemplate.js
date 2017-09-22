import React from 'react';

import { connect } from 'react-redux';
import {
    branch,
    compose,
    getDisplayName,
    lifecycle,
    renderComponent,
    setDisplayName,
    withProps
} from 'recompose';
import {
    ActivityIndicator as Spinner
} from 'components';

/**
 * Extract current hacky logics to separate manageable HOC,
 * & make it easier to fix.
 *
 * Input:
 *  Data from Push/Response/Session/Callback or any other event
 *
 * Output:
 *  Data understood/required by Widget.
 *  - Template
 *  - Data/Values
 */

const withResolvedTemplate = ({template}) => lifecycle({
    state: {loading: true},
    componentDidMount() {
        fetch(template)
            .then((response) => response.json())
            .then((data) => this.setState({loading: false, template: data}))
            .catch((err) => console.error(err));
    }
});

const isLoading = ({loading}) => {
    return loading
};

const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);


const withTemplate = compose(
    connect((store) => {
        return {
            data: store.data
        };
    }),
    withProps(({data, widget}) => {
        // for backwards compatibility
        // widget had all states of template
        // upcoming: data should have template URL

        return {
            template: data[widget.uuid] ? data[widget.uuid].template : 'init'
        }
    })
);

const enhance = (props) => compose(
    withResolvedTemplate(props),
    withSpinnerWhileLoading
);

export const withWidgetTemplate = (WrappedComponent) => {
    class WithWidgetTemplate extends React.PureComponent {
        render() {
            const {template, widget, ...props} = this.props;

            if (template && widget.template[template]) {
                console.warn('Deprecated template layout structure!');
                console.warn('Composite template structure detected, ' +
                    'switch to individual templates!');
                return <WrappedComponent
                    widget={widget}
                    template={widget.template[template]}
                    {...props}/>
            }

            const Component = enhance({template})(WrappedComponent);
            return <Component widget={widget} template={{template: template}} {...props}/>;
        }
    }

    return compose(
        setDisplayName(`WithWidgetTemplate(${getDisplayName(WrappedComponent)})`),
        withTemplate,
    )(WithWidgetTemplate);
};
