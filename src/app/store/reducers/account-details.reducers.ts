import { IAccountDetails } from '../../models/account-details.interface';
import { EAccountActions, AccountActions } from '../actions/account.actions';
 
export interface AccountDetailsState {
  account: IAccountDetails
}

export const initialAccountDetailsState: AccountDetailsState = {
  account: null
}
  
export function accountDetailsReducers(state = initialAccountDetailsState,
        action: AccountActions): AccountDetailsState {

    switch(action.type) {
    
        case EAccountActions.AccountDetailsLoaded: {
        
            return {
                ...state,
                account: action.payload
            };
        }
        
        default:
            return state;
    }

}
