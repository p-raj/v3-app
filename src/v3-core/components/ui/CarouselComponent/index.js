import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CarouselComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        // for saving server's ass, until its stable enough @AP :/
        // disable infinite
        let settings = {
            dots: true,
            infinite: false,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            accessibility: false,
            adaptiveHeight: false,
            arrows: false,
        };
        return (
            <Slider {...settings}>
                {this.props.children}
            </Slider>
        )
    }
}

export default CarouselComponent