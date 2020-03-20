import ViewModelBase from '../../../base/ViewModelBase'

export default class AccountDetailsViewModel extends ViewModelBase {
    
	historyGrouping: any[] = [];
	detailListGroup: any[] = [];
	
	category: string
	accountName: string
	accountNum: string
	balance: number
	currency: string
	disclaimer: string
	info: string
	alert: string
	balanceCurrency: string

	constructor() {

		super()
		
		this.fieldMap = {
			Transactions: 'Account.Transactions',
			AccountDetails: 'Account.AccountDetails',
			History24: 'Common.History24',
			Site: 'Common.Site',
			Disclaimer: 'Common.Disclaimer'
		}
	}
	
	setAccount = (account) => {
		
		if (account) {
			this.category = account.category;
		    this.accountName = account.description;
		    this.accountNum = account.maskedAccount;
		    this.balance = account.balances[0].amount;
            this.currency = account.balances[0].currency;
            this.disclaimer = account.disclaimer;
            this.info = account.info;
            this.alert = account.alert;
            this.balanceCurrency = '' + this.balance;
            
            if (this.currency !== 'CAD') {
            	this.balanceCurrency += ' ' + this.currency;
            }
            
            this.detailListGroup = this.parseDetailsList(account);
            this.historyGrouping = this.parseHistoryList(account);
		}
	}
	
	parseHistoryList = (account) => {

		let accountDetailsSections = [];
		let accountDetailsSectionsHolder = {};
		
		account.details.historyList.map((history, index) => {

			let category = history.date;
                
            if(!accountDetailsSectionsHolder[category]){
                	accountDetailsSectionsHolder[category] = { dategroup: category, records: [] };
                	accountDetailsSections.push(accountDetailsSectionsHolder[category]);
            }

            let ahr = new AccountHistoryRecord(history);
            accountDetailsSectionsHolder[category].records.push(ahr);
        });
		
		return accountDetailsSections;
	}
	
	parseDetailsList = (account) => {

		 let rows = [];
		 
		 account.details.detailsList.map((detail, index) => {

             let detailItem = new DetailItem(detail);
             rows.push(detailItem);
         });
		 
         return rows;
	}
}

class AccountHistoryRecord {
	
	date: string
	amount: number
	description: string
	
	constructor(history) {
		this.date = history.date
		this.amount = history.amount
		this.description = history.description
	}
}

class DetailItem {
    
	description: string
    detail: string
    
	constructor(detail) {
	    this.description = detail.description;
	    this.detail = detail.detail;
	}
}
