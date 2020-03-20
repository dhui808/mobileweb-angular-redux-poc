import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import EventHandler from '../../../base/EventHandler'
import BankingBase from '../../../base/BankingBase'
import {IAppState} from '../../../store/state/app.state'
import { LogoutReq } from '../../../store/actions/logout.actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  controller: LogoutController
	
  constructor(public router: Router, private _store: Store<IAppState>) { }

  ngOnInit() {
	  this.controller = new LogoutController(this, this._store);
	  this.controller.handleLogout();
  }

}

class LogoutController extends EventHandler {
	
	logout: any
	
	constructor(logout, private _store: Store<IAppState>) {
		super()
		this.logout= logout;
	}
	
	handleLogout = () => {
	    this._store.dispatch(new LogoutReq());
		//this.executeSubmit('LOGOUT', null, null);
	}
	
	getOriginatingPage(): any {
		return this.logout;
	}
	
	onSubmitSuccess(result: any): void {
		// not actually called. added this method to satisfy the compiler.
	}
}
