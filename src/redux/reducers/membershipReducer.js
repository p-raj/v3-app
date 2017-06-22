/**
 * Reducer for the membership API.
 *
 * The API meta information like pagination &
 * the state of the request is stored here as well.
 */
import * as TYPE from '../actions/membership';
import { LOAD_REDUX_STATE } from '../actions/storage';


export default function membershipReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.SAVE_MEMBERSHIPS:
            let selected = state.selected;
            let memberships = action.payload.results;

            if (!selected && memberships.length !== 0) {
                // let's do another transformation
                // when loading the new memberships
                // select the first membership to further induce more actions
                // remember: only apply this transformation
                // if no membership has been selected earlier
                selected = selected || memberships[0]
            }

            return {
                ...state,
                ...action.payload,
                selected: selected
            };
        case TYPE.SELECT_MEMBERSHIP:
            return {
                ...state,
                selected: action.payload
            };

        case LOAD_REDUX_STATE:
            return {
                ...state,
                // selected: action.payload.memberships.selected
            };
        default:
            return state;
    }
}
