import React from 'react';
import RN from 'react-native';


const Styles = RN.StyleSheet.create({
    horizontal: {
        flexDirection: 'column'
    }
});


class VerticalLayout extends React.Component {
    render() {
        const {style, ...props}= this.props;
        return (
            <RN.View style={[style, Styles.horizontal]} {...props}>
                {this.props.children}
            </RN.View>
        );
    }
}

VerticalLayout.PropTypes = RN.View.PropTypes;

export default VerticalLayout;