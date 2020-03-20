import { Component, OnInit, Input } from '@angular/core';
import PageBase from '../../../base/PageBase'
import BankingBase from '../../../base/BankingBase'
import ViewModelBase from '../../../base/ViewModelBase'
import DetailsController from './DetailsController'
import AccountDetailsViewModel from './AccountDetailsViewModel'
import {IAppState} from '../../../store/state/app.state'
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent extends PageBase implements OnInit {

	@Input()	accountsMain: any
	@Input()	accountKey: string
	@Input()	accountDetailsOnly: boolean
  
	controller: DetailsController
	viewModel: any
	
  constructor(private _store: Store<IAppState>) {
	    super();
	    console.debug("DetailsComponent.constructor()")
	    this.controller = new DetailsController(this, this._store);
  }

  ngOnInit() {
      console.debug("DetailsComponent.ngInit()")
  	  //this.controller = new DetailsController(this, this._store);
	  // when navigating to /accounts/details in a small device, accountKey is passed in in the url
	  this.viewModel = this.controller.accountDetailsViewModel;
	  this.changeLanguage(BankingBase.language)
	  if (this.accountKey) {
		  this.loadAccount(this.accountKey);
	  }
  }
  
  loadAccount(accountKey) {
      console.debug("DetailsComponent.loadAccount(), controller=" + this.controller)
  	  this.controller.loadAccount(accountKey);
  }
  
  getViewModel(): ViewModelBase {
	  return this.viewModel
  }
}
