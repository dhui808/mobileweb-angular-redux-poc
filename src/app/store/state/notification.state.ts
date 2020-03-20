import { INotification } from '../../models/notification.interface';

export interface INotificationState {
  notification: INotification
}

export const initialNotificationState: INotificationState = {
  notification: null
}
