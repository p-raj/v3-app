import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import { getDisplayName } from 'recompose';


export function withTextProps(WrappedComponent) {
    @themr('text')
    class WithTextProps extends React.Component {
        static contextTypes = {
            enqueue: PropTypes.func,
        };

        render() {
            // filter out extra props that are specific to this HOC and shouldn't be
            // passed through
            // eslint-disable-next-line
            const {value, theme, action, ...passThroughProps} = this.props;

            return (
                <WrappedComponent
                    {...passThroughProps}
                    onPress={this.onPress}>
                    {value}
                </WrappedComponent>
            )
        }

        onPress = () => {
            if (!this.props.action) return;

            this.context.enqueue(this.props.action);
        }
    }

    WithTextProps.displayName = `WithTextProps(${getDisplayName(WrappedComponent)})`;
    return WithTextProps;
}
