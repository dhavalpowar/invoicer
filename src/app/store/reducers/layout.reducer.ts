import {
    LayoutActionTypes,
    LayoutActionsUnion,
  } from '../actions/layout.actions';


export interface State {
  appAlert: string;
  showAppAlert: boolean;
  showLoading: boolean;
  showProcessing: boolean;
}

const initialState: State = {
  appAlert: '',
  showAppAlert: false,
  showLoading: false,
  showProcessing: false
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.SetAppAlert:
        return { ...state, appAlert: action.payload };
    case LayoutActionTypes.ShowAppAlert:
      return { ...state, showAppAlert: true };
    case LayoutActionTypes.HideAppAlert:
      return { ...state, showAppAlert: false };
    case LayoutActionTypes.ShowLoading:
      return { ...state, showLoading: true };
    case LayoutActionTypes.HideLoading:
      return { ...state, showLoading: false };
    case LayoutActionTypes.ShowProcessing:
      return { ...state, showProcessing: true };
    case LayoutActionTypes.HideProcessing:
      return { ...state, showProcessing: false };
    default:
      return state;
  }
}

export const getAppAlert = (state: State) => state.appAlert;
export const getShowAppAlert = (state: State) => state.showAppAlert;
export const getShowLoading = (state: State) => state.showLoading;
export const getShowProcessing = (state: State) => state.showProcessing;
