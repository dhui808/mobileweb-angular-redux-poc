import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/app.state';
import { loginToAccountReducers } from './login.reducers';
import { globalErrorReducers } from './global-error.reducers';
import { notificationReducers } from './notification.reducers'
import { mfaAnswerReducers, mfaQuestionReducers } from './mfa.reducers'
import { accountReducers } from './account.reducers'
import { accountDetailsReducers } from './account-details.reducers'
import { accountClassReducers } from './account-class.reducers'

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  loginToAccount: loginToAccountReducers,
  globalError: globalErrorReducers,
  notification: notificationReducers,
  mfaQuestion: mfaQuestionReducers,
  accounts: accountReducers,
  account: accountDetailsReducers,
  accountClasses: accountClassReducers
};
