import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../dynamic/Component';


export function withLayoutProps(WrappedComponent) {
    class WithLayoutProps extends React.Component {
        render() {
            const {components, ...props} = this.props;
            const children = components.map(({type, ...props}) => {
                return <Component type={type} {...props}/>
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

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
