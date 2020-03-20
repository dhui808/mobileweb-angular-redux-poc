import { ENavigationActions, NavigationActions } from '../actions/navigation.actions';
import { initialLoginToAccountState, ILoginToAccountState } from '../state/login-to-account.state';
import { initialMfaQuestionState, IMfaQuestionState } from '../state/mfa.state';

export function mfaQuestionReducers (
  state = initialMfaQuestionState,
  action: NavigationActions
): IMfaQuestionState {
  switch (action.type) {
    case ENavigationActions.GoToMfa: {
      return {
        ...state,
        question: action.payload
      };
    }

    default:
      return state;
  }
};

export function mfaAnswerReducers (
    state = initialLoginToAccountState,
    action: NavigationActions
): ILoginToAccountState {
    switch (action.type) {
      case ENavigationActions.GoToAccount: {
          return state;
      }
    
      default:
        return state;
    }
};
