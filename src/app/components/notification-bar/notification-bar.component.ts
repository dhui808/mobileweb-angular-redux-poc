import { Component, OnInit } from '@angular/core';
import BankingBase from '../../base/BankingBase'
import EventHandler from '../../base/EventHandler'
import PageBase from '../../base/PageBase'
import ViewModelBase from '../../base/ViewModelBase'
import {IAppState} from '../../store/state/app.state'
import { selectNotification } from '../../store/selectors/notification.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent extends PageBase implements OnInit {

  notification$ = this._store.pipe(select(selectNotification));
  
  notification: NotificationBarViewModel = new NotificationBarViewModel();
  constructor(private _store: Store<IAppState>) {
    super();
    BankingBase.notificationBar = this.notification;
  }

  ngOnInit() {
    this.doTranslation()
  }
  
  getViewModel(): ViewModelBase {
    return this.notification;
  }
}

class NotificationBarViewModel extends ViewModelBase {
  classNames: string 
  text: string

  constructor() {
    super();
    this.fieldMap = {
      networkError: 'Errors.NetworkError'
    }
  }
  
  handleError = (message) => {
    this.classNames = "error-message alert-box"
    this.text = message
  }
  
  handleNetworkError = (data) => {
    this.classNames = "default-message alert-box"
    this.text = this['networkError']
  }
  
  handleConfirmation = (message) => {
    this.classNames = "confirmation-message alert-box"
    this.text = message
  }
}
