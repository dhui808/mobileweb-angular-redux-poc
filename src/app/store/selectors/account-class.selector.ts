import {createFeatureSelector, createSelector} from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { AccountClassState, selectAll } from '../reducers/account-class.reducers';

export const selectAccountClassesState = createFeatureSelector<AccountClassState>("accountClasses");

export const selectAccountClasses = createSelector(
    selectAccountClassesState,
    selectAll
)

export const selectSelectedAccountKey = createSelector(
    selectAccountClassesState,
    accountClassState => accountClassState.selectedAccountKey
)