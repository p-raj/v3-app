import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import humanReadableDateTime from '../../utils/HumanReadableDateTime';
import theme from '../../utils/theme'
import { withAuthentication } from '../../v3-core/components/hoc/Auth';
import * as _ from 'lodash';
import { moderateScale } from '../../utils/responsiveGuidelines';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
    },
    organizationName: {
        fontSize: theme.h0,
        color: theme.black,
        backgroundColor: 'transparent',
        fontWeight: '700',
    },
    membershipInfo: {
        fontSize: theme.h5,
        color: theme.lightBlack,
        backgroundColor: 'transparent'
    },
    image: {
        backgroundColor: 'transparent',
        width: moderateScale(80, 0.05),
        height: moderateScale(80, 0.05),
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
                    <View style={{flex: 1}}>
                        <Image
                            source={{
                                uri: _.isEmpty(this.props.image) ?
                                    "http://via.placeholder.com/80x80" :
                                    this.props.image
                            }}
                            resizeMode="contain"
                            style={styles.image}/>
                    </View>
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


