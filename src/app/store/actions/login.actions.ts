import { Action } from '@ngrx/store';

import { ILoginToAccount } from '../../models/login-to-account.interface';
import { ILoginReq } from '../../models/login-req.interface';

export enum ELoginActions {
  LoginReq = '[LoginReq] Login Request',
  LoginToAccountRes = '[LoginToAccountRes] Login Response - Account'
}

export class LoginReq implements Action {
  public readonly type = ELoginActions.LoginReq;
  constructor(public payload: ILoginReq) {}
}

export class LoginToAccountRes implements Action {
  public readonly type = ELoginActions.LoginToAccountRes;
  constructor(public payload: ILoginToAccount) {}
}

export type LoginActions = LoginReq | LoginToAccountRes;
