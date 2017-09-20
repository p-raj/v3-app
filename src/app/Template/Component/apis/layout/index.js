import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';
import Component from 'app/Template/Component';


export function withLayoutProps(WrappedComponent) {
    class WithLayoutProps extends React.Component {
        render() {
            const {components, ...props} = this.props;
            const children = components.map(({type, ...props}, index) => {
                return <Component key={index} type={type} {...props}/>
            });

            // Pass props to wrapped component
            return (
                <WrappedComponent {...props}>
                    {children}
                </WrappedComponent>
            );
        }

    }

    WithLayoutProps.defaultProps = {
        components: []
    };
    WithLayoutProps.propTypes = {
        components: PropTypes.arrayOf(PropTypes.object)
    };
    WithLayoutProps.displayName = `WithLayoutProps(${getDisplayName(WrappedComponent)})`;
    return WithLayoutProps;
}
