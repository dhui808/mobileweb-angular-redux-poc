import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IAccountClass } from '../../models/account-class.interface';
import { EAccountClassActions, AccountClassActions } from '../actions/account-class.actions';
 
export interface AccountClassState extends EntityState<IAccountClass> {
    selectedAccountKey: string
}

export function selectedAccountKey(a: IAccountClass): string {
  return a.accountKey;
}

export const adapter: EntityAdapter<IAccountClass> = createEntityAdapter<IAccountClass>({
    selectId: selectedAccountKey
});
 
export const initialAccountClassState: AccountClassState = adapter.getInitialState({
  selectedAccountKey: null,
});
 
export function accountClassReducers(state = initialAccountClassState,
        action: AccountClassActions): AccountClassState {

    switch(action.type) {
    
    case EAccountClassActions.AddAccountClasses:
    
        return adapter.addAll(action.payload.accountClasses, {...state, selectedAccountKey: action.payload.selectedAccountKey});
    
    case EAccountClassActions.UpdateAccountClasses:
        
        return adapter.updateMany(action.payload.accountClasses, {...state, selectedAccountKey: action.payload.selectedAccountKey});
        
    default:
        return state;
    }

}

export const {
    selectAll
} = adapter.getSelectors();
