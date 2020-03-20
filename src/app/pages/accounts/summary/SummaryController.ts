import EventHandler from '../../../base/EventHandler'
import AccountSummaryViewModel from './AccountSummaryViewModel'
import {IAppState} from '../../../store/state/app.state'
import { Store, select } from '@ngrx/store';
import { AccountsReq } from '../../../store/actions/account.actions';
import { selectAccounts } from '../../../store/selectors/account.selector';
import { filter, map } from 'rxjs/operators';
import { AccountSelected } from '../../../store/actions/account-class.actions';

export default class SummaryController extends EventHandler {

	summaryMain: any
	accountsMain: any
	viewModel: AccountSummaryViewModel
	accountSummarySections: any[]
	currentAccountView: any
	
	constructor(summaryMain, private _store: Store<IAppState>) {
		super();
		this.summaryMain = summaryMain;
		this.viewModel = new AccountSummaryViewModel(this._store)
		this._store.pipe(select(selectAccounts), filter(accounts => accounts !== null && accounts.length > 0)).subscribe((accounts) => this.onSubmitSuccess(accounts));
	}
	
	loadAccounts = () => {
	    console.debug("SummaryController.loadAccounts() is called.")
	    this._store.dispatch(new AccountsReq());
		//this.executeSubmit('ACCOUNT_SUMMARY', null, null);
	}
	
	onSubmitSuccess = (accounts) => {
		console.log('Accounts load success:' + accounts.length)
		
		this.viewModel.setResponseAccountsAndController(accounts, this);
		let accountSummarySections = this.viewModel.accountSummarySections;
		
		// keep track of the currently selected account view.
		this.currentAccountView = this.viewModel.getInitialAccountView();
		
		// update view
		// this.summaryMain.setState({accountSummarySections : accountSummarySections});
		this.summaryMain.accountsMain.select(this.currentAccountView.key, this.isWideView(), true);
		
		// force resize event to initialize certain states.
		this.handleResize();
	}
	
	select = (view) => {
		//this.currentAccountView.deselect();
		//this.currentAccountView = view;
	    this._store.dispatch(new AccountSelected(view.key));
		this.summaryMain.accountsMain.select(this.currentAccountView.key, this.isWideView(), false);
	}
	
	getOriginatingPage(): any {
		return this.summaryMain;
	}
}
