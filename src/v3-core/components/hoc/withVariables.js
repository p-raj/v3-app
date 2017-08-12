import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export function withVariables(WrappedComponent) {
    class WithVariables extends React.Component {
        render() {
            const {widget, runtime} = this.context;
            const {user, membership, ...passThroughProps} = this.props;
            const {value, ...props} = passThroughProps;

            if (!value) {
                return (
                    <WrappedComponent value={value} {...props} />
                );
            }

            // TODO AST/EL
            const substitutedValue = JSON.parse(
                JSON.stringify(value)
                    .replace(/\$.date/g, new Date().toISOString())

                    .replace(/\$.user.id/g, user.uuid)
                    .replace(/\$.user.name/g, user.email)
                    .replace(/\$.user.email/g, user.name)
                    .replace(/\$.user.avatar/g, user.avatar)
                    .replace(/\$.member.id/g, membership.uuid)
                    .replace(/\$.organization.id/g, membership.uuid)

                    .replace(/\$.widget.id/g, widget.uuid)
                    .replace(/\$.widget.name/g, widget.name)
                    .replace(/\$.widget.description/g, widget.description)
                    .replace(/\$.app.id/g, runtime.uuid)
                    .replace(/\$.app.name/g, runtime.name)
                    .replace(/\$.app.description/g, runtime.description)
            );

            return (
                <WrappedComponent value={substitutedValue} {...props} />
            );

        }
    }

    WithVariables.displayName = `WithVariables(${getDisplayName(WrappedComponent)})`;
    WithVariables.contextTypes = {
        widget: PropTypes.object,
        runtime: PropTypes.object
    };
    return connect((store) => {
        return {
            user: store.auth,
            membership: store.memberships.selected
        }
    })(WithVariables);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
