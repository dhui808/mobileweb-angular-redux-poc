import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { INotificationState } from '../state/notification.state';

const selectNotificationState = (state: IAppState) => state.notification;

export const selectNotification = createSelector(
  selectNotificationState,
  (state: INotificationState) => state.notification
);

