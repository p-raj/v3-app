import React from 'react';
import { Icon as RNEIcon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export default class Icon extends React.Component {
    render() {
        let {onPress, ...props} = this.props;

        if (!onPress) {
            return <RNEIcon {...props}/>
        }

        // react-native-elements does perfectly fine,
        // but we are using react-native-web,
        // and TouchableHighlight adds a view to the view hierarchy
        // also, it seems like the implementation has some bugs there
        // but using TouchableOpacity instead fixes the problem on web as well
        // TODO:
        // find root cause and send a PR to likely awesome culprit react-native-web for
        // Uncaught Error: removeComponentAsRefFrom(...): Only a ReactOwner can have refs.
        // You might be removing a ref to a component that was not created inside a component's
        // `render` method, or you have multiple copies of React loaded
        return (
            <TouchableOpacity
                onPress={onPress}>
                <RNEIcon {...props} />
            </TouchableOpacity>
        )
    }
}

Icon.propTypes = RNEIcon.propTypes;
Icon.defaultProps = {
    type: 'font-awesome'
};