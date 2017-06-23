import React from 'react';
import RN from 'react-native';


const Styles = RN.StyleSheet.create({
    horizontal: {
        flexDirection: 'row'
    }
});


class HorizontalLayout extends React.Component {
    render() {
        const {style, ...props} = this.props;
        return (
            <RN.View style={[style, Styles.horizontal]} {...props}>
                {this.props.children}
            </RN.View>
        );
    }
}

HorizontalLayout.propTypes = RN.View.propTypes;

export default HorizontalLayout;