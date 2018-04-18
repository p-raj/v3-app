import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CarouselComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        let infinite = this.props.children.length !== 1;
        let settings = {
            dots: true,
            infinite: infinite,
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