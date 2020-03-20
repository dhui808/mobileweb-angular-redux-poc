import { Action } from '@ngrx/store';

import { IAccount } from '../../models/account.interface';
import { IAccountDetails } from '../../models/account-details.interface';

export enum EAccountActions {
  AccountsReq = '[AccountsReq] AccountsReq',
  AccountsLoaded = '[AccountsLoaded] AccountsLoaded',
  AccountDetailsReq = '[AccountDetailsReq] AccountDetailsReq',
  AccountDetailsLoaded = '[AccountDetailsLoaded] AccountDetailsLoaded'
}

export class AccountsReq implements Action {
  public readonly type = EAccountActions.AccountsReq;
  constructor() {}
}

export class AccountsLoaded implements Action {
  public readonly type = EAccountActions.AccountsLoaded;
  constructor(public payload:{ accounts: IAccount[]}) {
      console.debug("account.length:" + payload.accounts.length)
  }
}

export class AccountDetailsReq implements Action {
  public readonly type = EAccountActions.AccountDetailsReq;
  constructor(public payload: string) {}
}

export class AccountDetailsLoaded implements Action {
  public readonly type = EAccountActions.AccountDetailsLoaded;
  constructor(public payload: IAccountDetails) {}
}

export type AccountActions = AccountsReq | AccountDetailsReq | AccountsLoaded | AccountDetailsLoaded;
