import { ECommonActions, CommonActions } from '../actions/common.actions';
import { initialNotificationState, INotificationState } from '../state/notification.state';

export function notificationReducers (
  state = initialNotificationState,
  action: CommonActions
): INotificationState {
  switch (action.type) {
    case ECommonActions.AddAppError: {
      return {
        ...state,
        notification: action.payload
      };
    }

    default:
      return state;
  }
};
