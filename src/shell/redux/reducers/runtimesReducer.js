import * as Membership from '../actions/membership';
import * as TYPE from '../actions/runtime';


export default function runtimesReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.SAVE_RUNTIMES:
            return {
                ...state,
                ...action.payload
            };
        case Membership.SELECT_MEMBERSHIP:
            return {
                ...state,
                // the runtime container shows all the runtimes
                // available for a particular membership
                // so let's tell the container that the active membership has changed
                // BTW this not a hack if you are wondering, i know you will :P
                // data transformation at the very basic level
                // runtime container cares about the selected state,
                // & we as human beings care when the membership changes
                // so should the runtime container state
                // Not Sure Yet ? Believe @gaearon then:
                // See: https://github.com/reactjs/redux/issues/291
                selected: `organization:${action.payload.organization.uuid}:member:${action.payload.uuid}`
            };

        case Membership.SAVE_MEMBERSHIPS:
            let selected = state.selected;
            let memberships = action.payload.results;

            if (!selected && memberships.length !== 0) {
                // let's do another transformation
                // when loading the new memberships
                // select the first membership to further induce more actions
                // remember: only apply this transformation
                // if no runtime has been selected earlier
                selected = selected || `organization:${memberships[0].organization.uuid}:member:${memberships[0].uuid}`
            }

            return {
                ...state,
                selected: selected
            };

        default:
            return state;
    }
}
