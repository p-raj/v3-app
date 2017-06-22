import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import theme from '../../../common/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Carousel
                style={styles.container}
                bullets={true}
                bulletStyle={{borderColor: theme.black}}
                chosenBulletStyle={{backgroundColor: theme.black, borderColor: theme.black}}
                autoplay={false}
                pageInfo={false}>
                {this.props.children}
            </Carousel>
        )
    }
}


