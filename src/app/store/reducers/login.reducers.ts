import { ELoginActions, LoginActions } from '../actions/login.actions';
import { initialLoginToAccountState, ILoginToAccountState } from '../state/login-to-account.state';

export function loginToAccountReducers (
  state = initialLoginToAccountState,
  action: LoginActions
): ILoginToAccountState {
  switch (action.type) {
    case ELoginActions.LoginToAccountRes: {
      return {
        ...state,
        loginToAccount: action.payload
      };
    }

    default:
      return state;
  }
};
