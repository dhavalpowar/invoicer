import { Action } from '@ngrx/store';

export enum AppActionTypes {
  CheckUpdateAvailable  = '[App] Check Update available',
  SetUpdateAvailable    = '[App] Set Update available'
}

export class CheckUpdateAvailable implements Action {
  readonly type = AppActionTypes.CheckUpdateAvailable;
}

export class SetUpdateAvailable implements Action {
    readonly type = AppActionTypes.SetUpdateAvailable;
    constructor(public payload: boolean) {}
  }

export type AppActionsUnion = CheckUpdateAvailable | SetUpdateAvailable;
