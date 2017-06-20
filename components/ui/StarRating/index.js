import React from 'react';
import StarRatingComponent  from 'react-star-rating-component';

export default class RatingComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            rating: 4
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.props.ratingGiven(nextValue);
    }

    render() {
        const { rating } = this.state;
        return (
            <div>
                <StarRatingComponent
                    name="rate1"
                    starColor={"black"}
                    emptyStarColor={"#b4b4b4"}
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}