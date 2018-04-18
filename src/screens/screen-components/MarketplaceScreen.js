import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import BlurView from '../../v3-core/components/ui/BlurView';
import theme from '../../utils/theme'


const {height, width} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height * 0.8,
        padding: '10%',
    },
    blur: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.16,
        borderColor: 'grey',
        shadowColor: 'black',
        shadowOffset: {
            width: 1, height: 1
        },
        shadowOpacity: 0.2,
    }
});

class MarketplaceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: {width, height}
        };
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({size: {width: layout.width, height: layout.height}});
    };

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayoutDidChange}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View style={{borderBottomWidth: 1, borderColor: theme.black, width: '80%'}}>
                        <Text style={{color: theme.black, fontSize: 40, fontWeight: 'bold'}}>
                            Market Place
                        </Text>
                        <Text style={{color: theme.black, fontSize: 18, marginVertical: 15}}>
                            Find amazing applications.
                        </Text>
                    </View>
                    <BlurView style={styles.blur}
                              blurType="light"
                              blurAmount={100}>
                        <View style={{margin: 50}}>
                            <Text style={{color: theme.black, fontSize: 18, textAlign: 'center'}}>
                                This is a work in progress,
                            </Text>
                            <Text style={{color: theme.black, fontSize: 18, textAlign: 'center'}}>
                                coming soon.
                            </Text>
                        </View>
                    </BlurView>
                </View>
            </View>
        )
    }

}

MarketplaceScreen = connect((store) => {
    return {
        // to prevent the unnecessary null checks
        auth: store.auth
    }
})(MarketplaceScreen);

export default withAuthentication(MarketplaceScreen);

