import {
    UserActionTypes,
    UserActionsUnion
} from '../actions/user.actions';

export interface State {
    loggedOut: boolean;
}

const initialState: State = {
    loggedOut: false
}

export function reducer(
    state: State = initialState,
    action: UserActionsUnion
): State {
    switch (action.type) {
        case UserActionTypes.Logout:
            return state;
        case UserActionTypes.LogoutSuccess:
            return { ...state, loggedOut: true };
        default:
            return state;
    }
}

export const getUserLoggedOut = (state: State) => state.loggedOut;
