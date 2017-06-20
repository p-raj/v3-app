import StarRating from 'react-native-star-rating';
import React  from 'react'


export default class StarRatingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 4
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
        this.props.ratingGiven(rating);
    }

    render() {
        return (
            <StarRating
                disabled={false}
                maxStars={5}
                rating={this.props.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        );
    }
}