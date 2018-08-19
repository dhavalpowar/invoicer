import {
    AppActionTypes,
    AppActionsUnion
} from '../actions/app.actions';

export interface State {
    updateAvailable: boolean;
}

const initialState: State = {
    updateAvailable: false
}

export function reducer(
    state: State = initialState,
    action: AppActionsUnion
): State {
    switch (action.type) {
        case AppActionTypes.CheckUpdateAvailable:
            return state;
        case AppActionTypes.SetUpdateAvailable:
            return { ...state, updateAvailable: action.payload };
        default:
            return state;
    }
}

export const getUpdateAvailable = (state: State) => state.updateAvailable;
