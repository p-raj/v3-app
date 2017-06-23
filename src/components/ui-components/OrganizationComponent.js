import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import humanReadableDateTime from '../../utils/HumanReadableDateTime';
import theme from '../../utils/theme'
import { withAuthentication } from '../../v3-core/components/hoc/Auth';


const { width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width*0.09,
    },
    row: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textContainer: {
        justifyContent: 'space-between',
        maxWidth: '70%'
    },
    organizationName: {
        fontSize: theme.h0,
        color: theme.black,
        backgroundColor: 'transparent',
        fontWeight: '700',
        flex: 1,
    },
    membershipInfo: {
        fontSize: theme.h4,
        color: theme.black,
        backgroundColor: 'transparent'
    },
    image: {
        borderRadius: 10,
        backgroundColor: theme.white,
        height: 70,
        width: 70,
        padding: 16
    }
});

class OrganizationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.organizationName}
                              numberOfLines={1}>
                            {`${this.props.organizationName || "N/A"}`}
                        </Text>
                        <Text style={styles.membershipInfo}
                              numberOfLines={1}>
                            {`Member since ${humanReadableDateTime(this.props.date) || "N/A"}`}
                        </Text>
                    </View>
                    <Image
                        source={{uri: `${this.props.image}`}}
                        resizeMode="contain"
                        style={styles.image}/>
                </View>
                <View
                    style={{
                        backgroundColor: theme.lightBlack,
                        borderColor: 'black',
                        height: 1,
                        width: '75%',
                        marginTop: theme.marginLarge
                    }}/>
            </View>

        )
    }
}

export default withAuthentication(OrganizationComponent);


