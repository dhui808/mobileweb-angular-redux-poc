import AccountDetailsViewModel from './AccountDetailsViewModel'
import EventHandler from '../../../base/EventHandler'
import {IAppState} from '../../../store/state/app.state'
import { Store, select } from '@ngrx/store';
import { AccountDetailsReq } from '../../../store/actions/account.actions';
import { selectAccountDetails } from '../../../store/selectors/account-details.selector';
import { filter } from 'rxjs/operators';

export default class DetailsController extends EventHandler {

	detailsMain: any
	accountDetailsViewModel: AccountDetailsViewModel
	accountDetailsOnly: boolean
	
	constructor(detailsMain, private _store: Store<IAppState>) {
		super();
		this.detailsMain = detailsMain
		this.accountDetailsViewModel = new AccountDetailsViewModel();
		this._store.pipe(select(selectAccountDetails), filter(account => account !== null)).subscribe((account) => this.onSubmitSuccess(account));
	}
	
	loadAccount = (accountKey) => {
	    this._store.dispatch(new AccountDetailsReq(accountKey));
	    //this.executeSubmit('ACCOUNT_DETAILS', {accountKey:accountKey}, null);
	}
	
	onSubmitSuccess = (account) => {
	    
		console.log('Account details load success.' + account.accountKey);
		this.accountDetailsViewModel.setAccount(account);
		// this.detailsMain.setState({account : this.accountDetailsViewModel});
		
		if (this.detailsMain.accountKey) {
			// details only view. need to force handleResize
			this.handleResize();
		}
	}
	
	panelDetails = () => {
		this.changeTab('tabDetails','panelDetails', this.detailsMain)
	}
	
	panelActivity = () => {
		this.changeTab('tabActivity', 'panelActivity', this.detailsMain)
	}
	
	getOriginatingPage(): any {
		return this.detailsMain.accountsMain;
	}
}
