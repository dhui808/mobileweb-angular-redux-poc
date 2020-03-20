import {createFeatureSelector, createSelector} from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { AccountState, selectAll } from '../reducers/account.reducers';

export const selectAccountState = createFeatureSelector<AccountState>("accounts");

export const selectAccounts = createSelector(
    selectAccountState,
    selectAll
)
