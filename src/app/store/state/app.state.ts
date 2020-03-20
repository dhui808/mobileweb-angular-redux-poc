import { RouterReducerState } from '@ngrx/router-store'

import { IGlobalErrorState, initialGlobalErrorState } from './global-error.state'
import { ILoginToAccountState, initialLoginToAccountState } from './login-to-account.state'
import { INotificationState, initialNotificationState } from './notification.state'
import { IMfaQuestionState, initialMfaQuestionState } from './mfa.state'
import { AccountDetailsState, initialAccountDetailsState } from '../reducers/account-details.reducers'
import { AccountState, initialAccountState } from '../reducers/account.reducers'
import { AccountClassState, initialAccountClassState } from '../reducers/account-class.reducers'

export interface IAppState {
  router?: RouterReducerState
  globalError: IGlobalErrorState
  loginToAccount: ILoginToAccountState
  notification: INotificationState
  mfaQuestion: IMfaQuestionState
  accounts: AccountState
  account: AccountDetailsState
  accountClasses: AccountClassState
}

export const initialAppState: IAppState = {
  globalError: initialGlobalErrorState,
  loginToAccount: initialLoginToAccountState,
  notification: initialNotificationState,
  mfaQuestion: initialMfaQuestionState,
  accounts: initialAccountState,
  account: initialAccountDetailsState,
  accountClasses: initialAccountClassState
};
