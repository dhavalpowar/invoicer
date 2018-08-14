import { Action } from '@ngrx/store';

export enum UserActionTypes {
  Logout = '[User] Logout',
  LogoutSuccess = '[User] Logout Success'
}


export class Logout implements Action {
  readonly type = UserActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = UserActionTypes.LogoutSuccess;
}

export type UserActionsUnion = Logout | LogoutSuccess;
