import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';

/**
 * The Style APIs consist across all the Components.
 * eg.
 *  - margin
 *  - padding
 */
export function withStyle(WrappedComponent) {
    class WithStyle extends React.Component {
        render() {
            const {style, ...props} = this.props;
            if (!style) {
                return (
                    <WrappedComponent {...props} />
                );
            }

            // TODO
            // validate incoming styles

            // const sheet = StyleSheet.create({style});
            return (
                <WrappedComponent {...props} style={style}/>
            );
        }
    }

    WithStyle.displayName = `WithStyle(${getDisplayName(WrappedComponent)})`;
    WithStyle.contextTypes = {
        values: PropTypes.object
    };
    return WithStyle;
}
