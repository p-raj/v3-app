import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';


/**
 * @NOTE:
 * withFormat should be wrapped inside withValues
 */
export function withFormat(WrappedComponent) {
    class WithFormat extends React.Component {
        render() {
            let {format, value, ...props} = this.props;

            if (!format) {
                return <WrappedComponent value={value} {...props} />
            }

            // TODO
            // make it factory with
            // different types of formats
            // eg. phone (E164), date (long, short)
            let {type, options} = format;
            let {locale, ...opts} = options;

            // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
            locale = locale || 'en-US';
            opts = opts || {
                weekday: 'short', year: 'numeric', month: 'short',
                day: 'numeric', hour: '2-digit', minute: '2-digit'
            };

            if (type === 'date') {
                const date = new Date(value);

                value = `${date.toLocaleString(locale, opts)}`;
            }

            return (
                <WrappedComponent value={value} {...props} />
            );
        }
    }

    WithFormat.displayName = `WithFormat(${getDisplayName(WrappedComponent)})`;
    WithFormat.propTypes = {
        format: PropTypes.shape({
            type: PropTypes.string,
            options: PropTypes.object
        }),
        value: PropTypes.any
    };
    return WithFormat;
}
