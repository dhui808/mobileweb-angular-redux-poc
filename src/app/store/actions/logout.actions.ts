import { Action } from '@ngrx/store';

export enum ELogoutActions {
  LogoutReq = '[LogoutReq] Logout Request',
  LogoutAction = '[LogoutAction] LogoutAction'
}

export class LogoutReq implements Action {
  public readonly type = ELogoutActions.LogoutReq;
  constructor() {}
}

export class LogoutAction implements Action {
  public readonly type = ELogoutActions.LogoutAction;
  constructor() {console.debug("The user is logging out.");}
}

export type LogoutActions = LogoutReq | LogoutAction
