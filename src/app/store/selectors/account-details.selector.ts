import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { AccountDetailsState } from '../reducers/account-details.reducers';

const selectAccountDetailsState = (state: IAppState) => state.account;

export const selectAccountDetails = createSelector(
    selectAccountDetailsState,
    (state: AccountDetailsState) => state.account
)

