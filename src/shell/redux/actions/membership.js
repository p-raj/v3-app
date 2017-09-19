export const SAVE_MEMBERSHIPS = 'SAVE_MEMBERSHIPS';
export const SELECT_MEMBERSHIP = 'SELECT_MEMBERSHIP';


export function selectMembership(membership) {
    return {
        type: SELECT_MEMBERSHIP,
        payload: membership
    };
}

export function saveMemberships(data) {
    return {
        type: SAVE_MEMBERSHIPS,
        payload: data
    };
}
