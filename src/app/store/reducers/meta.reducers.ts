import { ActionReducer, MetaReducer } from '@ngrx/store';
import { ELogoutActions } from '../actions/logout.actions';

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    return reducer(action.type === ELogoutActions.LogoutAction ? undefined : state, action);
  };
}
  
export const metaReducers: MetaReducer<any>[] = [logout];
