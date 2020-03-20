import { ECommonActions, CommonActions } from '../actions/common.actions';
import { IGlobalErrorState, initialGlobalErrorState } from '../state/global-error.state';

export function globalErrorReducers(
  state = initialGlobalErrorState,
  action: CommonActions
): IGlobalErrorState {
  switch (action.type) {
    case ECommonActions.AddNetworkError: {
      return {
        ...state,
        error: action.payload
      };
    }
    case ECommonActions.AddAppError: {
        return {
          ...state,
          error: action.payload
        };
    }

    default:
      return state;
  }
}
