import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { DetailsComponent } from './details/details.component'
import BankingBase from '../../base/BankingBase'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @ViewChild(DetailsComponent, {static: false}) details: DetailsComponent
  
	constructor(public router: Router) { }

	ngOnInit() { }
  
	select(accountKey, isWideView, initialLoading) {
	    console.debug("AccountsComponent.select()")
		if (isWideView || initialLoading) {
			this.details.loadAccount(accountKey);
		} else {
			BankingBase.navigation.navigateTo('ACCOUNT_DETAILS', this, accountKey, null)
		}
	}
}
