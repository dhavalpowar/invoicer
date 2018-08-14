import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SetAppAlert       = '[Layout] Set App Alert',
  ShowAppAlert      = '[Layout] Show App alert',
  HideAppAlert      = '[Layout] Hide App alert',
  ShowLoading       = '[Layout] Show Loading',
  HideLoading       = '[Layout] Hide Loading',
  ShowProcessing    = ']Layout] Show Processing',
  HideProcessing    = '[Layout] Hide Processing',

}

export class SetAppAlert implements Action {
  readonly type = LayoutActionTypes.SetAppAlert;
  constructor(public payload: string) {}
}

export class ShowAppAlert implements Action {
  readonly type = LayoutActionTypes.ShowAppAlert;
}

export class HideAppAlert implements Action {
  readonly type = LayoutActionTypes.HideAppAlert;
}

export class ShowLoading implements Action {
  readonly type = LayoutActionTypes.ShowLoading;
}

export class HideLoading implements Action {
  readonly type = LayoutActionTypes.HideLoading;
}

export class ShowProcessing implements Action {
  readonly type = LayoutActionTypes.ShowProcessing;
}

export class HideProcessing implements Action {
  readonly type = LayoutActionTypes.HideProcessing;
}

export type LayoutActionsUnion = SetAppAlert | ShowAppAlert |
  HideAppAlert | ShowLoading | HideLoading |
  ShowProcessing | HideProcessing;
