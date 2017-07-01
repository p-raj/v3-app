import React from 'react';
import  Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { View } from 'react-native';

export default class CarouselComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <View style={{
                flexGrow: 1,
                margin: 0,
                padding: 0,
                display: 'flex'
            }}>
                <Slider {...settings}>
                    {this.props.children}
                </Slider>
            </View>
        )
    }
}