import { Action } from '@ngrx/store';
import {Update} from '@ngrx/entity';
import { IAccountClass } from '../../models/account-class.interface';

export enum EAccountClassActions {
  AddAccountClasses = '[AddAccountClasses] AddAccountClasses',
  AccountSelected = '[AccountSelected] Account Selected',
  UpdateAccountClasses = '[UpdateAccountClasses] Update Account Classes'
}

export class AddAccountClasses implements Action {
  public readonly type = EAccountClassActions.AddAccountClasses;
  constructor(public payload: {accountClasses: IAccountClass[], selectedAccountKey: string}) {}
}

export class AccountSelected implements Action {
  public readonly type = EAccountClassActions.AccountSelected;
  constructor(public payload: string) {}
}

export class UpdateAccountClasses implements Action {
  public readonly type = EAccountClassActions.UpdateAccountClasses;
  constructor(public payload: {accountClasses: Update<IAccountClass>[], selectedAccountKey: string}) {}
}

export type AccountClassActions = AddAccountClasses | AccountSelected | UpdateAccountClasses
