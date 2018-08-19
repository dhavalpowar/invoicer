import {
    ActionReducerMap,
    createSelector,
    createFeatureSelector,
    ActionReducer,
    MetaReducer,
  } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromApp from './app.reducer';
import * as fromLayout from './layout.reducer';
import * as fromUser from './user.reducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  app: fromApp.State;
  layout: fromLayout.State;
  user  : fromUser.State;
  router: fromRouter.RouterReducerState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    app   : fromApp.reducer,
    layout: fromLayout.reducer,
    user  : fromUser.reducer,
    router: fromRouter.routerReducer,
  };

  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State, action: any): State {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
    };
  }

  /**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger, storeFreeze]
: [];

/**
 * App reducers
 */
export const getAppState = createFeatureSelector<fromApp.State>(
'app'
);

/**
* Layout Reducers
*/
export const getLayoutState = createFeatureSelector<fromLayout.State>(
'layout'
);

/**
* User Reducers
*/
export const getUserState = createFeatureSelector<fromUser.State>(
'user'
);

export const getUpdateAvailable = createSelector(
    getAppState,
    fromApp.getUpdateAvailable
);

export const getAppAlert = createSelector(
    getLayoutState,
    fromLayout.getAppAlert
);

export const getShowAppAlert = createSelector(
    getLayoutState,
    fromLayout.getShowAppAlert
);

export const getShowLoading = createSelector(
    getLayoutState,
    fromLayout.getShowLoading
);

export const getShowProcessing = createSelector(
    getLayoutState,
    fromLayout.getShowProcessing
);

export const getUserLoggedOut = createSelector(
    getUserState,
    fromUser.getUserLoggedOut
);
