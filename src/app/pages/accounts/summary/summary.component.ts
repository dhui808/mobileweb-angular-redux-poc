import { Component, OnInit, Input } from '@angular/core';
import PageBase from '../../../base/PageBase'
import BankingBase from '../../../base/BankingBase'
import ViewModelBase from '../../../base/ViewModelBase'
import SummaryController from './SummaryController'
import AccountSummaryViewModel from './AccountSummaryViewModel'
import {IAppState} from '../../../store/state/app.state'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent extends PageBase implements OnInit {

	@Input()	accountsMain: any
	controller: SummaryController
	viewModel: any
	
	constructor(private _store: Store<IAppState>) {
		super()
	}
	
	ngOnInit() {
		this.controller = new SummaryController(this, this._store)
		this.viewModel = this.controller.viewModel
		this.doTranslation()
		this.controller.loadAccounts();
	}

    getViewModel(): ViewModelBase {
	    return this.viewModel
	}
}
