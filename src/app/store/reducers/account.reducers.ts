import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IAccount } from '../../models/account.interface';
import { EAccountActions, AccountActions } from '../actions/account.actions';

export interface AccountState extends EntityState<IAccount> {
}

export function selectedAccountKey(a: IAccount): string {
  //In this case this would be optional since primary key is id
  return a.accountKey;
}

export const adapter: EntityAdapter<IAccount> = createEntityAdapter<IAccount>({
    selectId: selectedAccountKey
});
 
export const initialAccountState: AccountState = adapter.getInitialState({
});
 
export function accountReducers(state = initialAccountState,
        action: AccountActions): AccountState {

    switch(action.type) {
    
    case EAccountActions.AccountsLoaded:
    
        return adapter.addAll(action.payload.accounts, state);
    
    default:
        return state;
    }

}

export const {
    selectAll
} = adapter.getSelectors();
