import { Action } from '@ngrx/store';

export enum ECommonActions {
  AddNetworkError = '[AddNetworkError] Add Network Error',
  AddAppError = '[AddAppError] Add Application Error',
  ExecuteServerAction = '[ExecuteServerAction] ExecuteServerAction'
}

export class AddNetworkError implements Action {
  public readonly type = ECommonActions.AddNetworkError;
  constructor(public payload: any) {}
}

export class AddAppError implements Action {
  public readonly type = ECommonActions.AddAppError;
  constructor(public payload: any) {}
}

export class ExecuteServerAction implements Action {
  public readonly type = ECommonActions.ExecuteServerAction;
  constructor(public url: string, public params: any) {}
}

export type CommonActions = AddNetworkError | AddAppError | ExecuteServerAction;
