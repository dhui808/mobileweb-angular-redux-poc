import ViewModelBase from '../../../base/ViewModelBase'
import {IAppState} from '../../../store/state/app.state'
import { Store, select } from '@ngrx/store';
import { selectAccountClasses } from '../../../store/selectors/account-class.selector';
import { filter, first, map, switchMap } from 'rxjs/operators';
export default class AccountSummaryViewModel extends ViewModelBase {
	
	accountSummarySections: any[]
	initialAccountView: any

	constructor(private _store: Store<IAppState>) {
		super()
		
		this.fieldMap = {
			AccountSummary: 'AccountSummary'
		}
		
		this.accountSummarySections = [];
	}
	
	setResponseAccountsAndController = (responseAccounts, summaryController) => {

		let accountSummarySectionsHolder = {};
		let accountKey = null;
		let selected = true;
		let actions = {
		        details: null,
		        options: []
		    };
		let category = responseAccounts[0].category;
		
		// application model and viewModle
		if(responseAccounts[0] && responseAccounts[0].accountKey){
            accountKey = responseAccounts[0].accountKey;
        }
		
		responseAccounts.map((account, index) => {

			// investing accounts do not have actions attr 
			if (!account.actions) {
				account.actions = actions;
			}
			
            if(!account.hideInSummary || account.category) {

                let categoryName = account.category;// todo i18n
                
                if(!accountSummarySectionsHolder[categoryName]){
                		accountSummarySectionsHolder[categoryName] = { category: categoryName, records: [] };
                		this.accountSummarySections.push(accountSummarySectionsHolder[categoryName]);
                }

                let asr = new AccountSummarySectionViewModel(account, selected, summaryController, this._store);
                accountSummarySectionsHolder[categoryName].records.push(asr);
            }
            
            // be default, only the first account is selected
            selected = false;
        });
		
		this.initialAccountView = accountSummarySectionsHolder[category].records[0].view;
	}
	
	getInitialAccountView = () => {
		return this.initialAccountView;
	}
}

class AccountSummarySectionViewModel {
    
	model: AccountSummaryRecord
	view: AccountSummaryView
	
	constructor(account, selected, controller, private _store: Store<IAppState>) {

	    this.model = new AccountSummaryRecord(account);
	    this.view = new AccountSummaryView(account, selected, controller, _store);
	}
}

class AccountSummaryRecord {
    
    key: string
    category: string
    description: string
    accountNum: string
    balances: number
    showCurrency: boolean
    
	constructor(account) {

	    this.key = account.accountKey;
	    this.category = account.category;
	    this.description = account.description;
	    this.accountNum = account.maskedAccount;
	    this.balances = account.balance;
	    this.showCurrency = false;
	
	    account.balance.map(balance => {
	        if (balance.currency !== 'CAD') {
	            this.showCurrency = true;
	        }
	    })
	}
}

class AccountSummaryView {
	
    key: string
    summaryController: any
    className: string
    hasDetailAction: boolean
    
    className$ = this._store.pipe(select(selectAccountClasses), 
            filter(accountClasses => accountClasses && accountClasses.length > 0), 
            map(accountClasses =>accountClasses.filter(accountClass => accountClass.accountKey === this.key)),
            map(accountClass => {return {className: this.getClassName(accountClass[0].accountClass)};}))
            
	constructor(account, selected, summaryController, private _store: Store<IAppState>) {

	    this.key = account.accountKey;
	    this.summaryController = summaryController;
	    this.className = selected? 'account-1-selected' : 'account-1';
	    this.setClassName = this.setClassName.bind(this);
	    this.select = this.select.bind(this);
	    this.hasDetailAction = (account.actions.details && account.actions.details.action === 'ACCOUNT_DETAILS')? true : false;
	    this.setClassName(this.className); 
	}
	
    //Used by Redux-based approach
    getClassName = (className) => {
        return this.hasDetailAction? className : 'account-1-disabled';
    }
    
    setClassName = (className) => {
    		this.className = this.hasDetailAction? className : 'account-1-disabled';
    }
	
	select =() => {
	    console.debug("AccountSummaryViewModel.select()")
		this.summaryController.select(this);
		//this.setClassName('account-1-selected');
	}
	
	deselect = () => {
		this.setClassName('account-1')
	}
}
