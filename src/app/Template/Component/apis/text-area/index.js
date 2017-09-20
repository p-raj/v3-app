import React from 'react';
import PropTypes from 'prop-types';
import {
    compose,
    getContext,
    getDisplayName,
    mapProps,
    setDisplayName,
    withHandlers
} from 'recompose';


export const withTextAreaProps = (WrappedComponent) => {
    return compose(
        setDisplayName(`WithTextAreaProps(${getDisplayName(WrappedComponent)})`),
        getContext({
            enqueue: PropTypes.func,
            setVariable: PropTypes.func,
        }),
        withHandlers({
            onChangeText: props => text => {
                props.setVariable(props.name, text);

                if (!props.action) return;
                props.enqueue(props.action);
            }
        }),
        mapProps(({disabled, value, ...rest}) => {
            const {enqueue, setVariable, ...props} = rest;
            return {
                ...props,
                editable: !disabled,
                defaultValue: value
            }
        })
    )((props) => <WrappedComponent {...props}/>);
};
