import { Action } from '@ngrx/store';

export class NavigationPaths {
    static LOGIN = 'LOGIN'
    static LOGOUT = 'LOGOUT' 
    static START = 'START'
    static MFA_ANSWER = 'MFA_ANSWER'
    static ACCOUNT_SUMMARY = 'ACCOUNT_SUMMARY'
    static ACCOUNT_DETAILS = 'ACCOUNT_DETAILS'
}

export abstract class NavigationAction implements Action {
    
    abstract type: string
    
    public static createNavigationAction(action: string, params: any):  NavigationAction{

        switch(action) {
            case NavigationPaths.MFA_ANSWER: {
                return new GoToMfa(params.question)
            }
            case NavigationPaths.ACCOUNT_SUMMARY: {
                return new GoToAccount()
            }
            case NavigationPaths.START: {
                return new GoToAccount()
            }
            
            default:
            return null;
        }
    }
}

export enum ENavigationActions {
  GoToMfa = '[GoToMfa] GoToMfa',
  GoToAccount = '[GoToAccount] GoToAccount',
  GoToStart = '[GoToStart] GoToStart'
}

export class GoToMfa extends NavigationAction {
  public readonly type = ENavigationActions.GoToMfa;
  constructor(public payload: string) {super()}
}

export class GoToAccount extends NavigationAction {
  public readonly type = ENavigationActions.GoToAccount;
  constructor() {super()}
}

export class GoToStart extends NavigationAction {
  public readonly type = ENavigationActions.GoToStart;
  constructor() {super()}
}

export type NavigationActions = GoToMfa | GoToAccount | GoToStart

