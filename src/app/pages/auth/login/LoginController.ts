import EventHandler from '../../../base/EventHandler'
import BankingBase from '../../../base/BankingBase'
import LoginViewModel from './LoginViewModel'
import {IAppState} from '../../../store/state/app.state'
import { LoginReq } from '../../../store/actions/login.actions';
import { Store } from '@ngrx/store';

export default class LoginController extends EventHandler {

	login: any;
	loginViewModel: LoginViewModel = new LoginViewModel();
	
	constructor(login, private _store: Store<IAppState>) {
		super()
		this.login = login;
	}
	
	handleUserIdChange = (event) => {
        this.loginViewModel.userId = event.target.value;
    }
	
    handlePasswordChange = (event) => {
        this.loginViewModel.password = event.target.value;
    }
	
	handleSubmit = (event) => {
	    let params = {userId:this.loginViewModel.userId, password:this.loginViewModel.password}
	    this._store.dispatch(new LoginReq(params));
	    //this.executeSubmit('LOGIN', params, event);
	    //return false;
	}
	
	onSubmitSuccess(result: any): void {
		console.log('Login success.'+result)
		BankingBase.navigation.navigateTo('ACCOUNT_SUMMARY', this.login, null, null)
	}
	
	getOriginatingPage(): any {
		return this.login;
	}
	
	toggleLanguage = () => {
		let langBtn = Array.from(document.getElementsByClassName('lang'));
		
		Array.from(langBtn).map((btn) => {
			if (!btn.classList.contains('checked-lang')) {
				btn.classList.add('checked-lang')
			} else {
				btn.classList.remove('checked-lang')
			}
	    })
	    
	    this.loginViewModel.language = (this.loginViewModel.language === 'fr')? 'en' : 'fr';

		console.log('this.loginViewModel.language=' + this.loginViewModel.language);
		
		this.login.changeLanguage(this.loginViewModel.language)
		this.login.notificationBar.changeLanguage(this.loginViewModel.language)
	}
	
	handleLocator = (event) => {
		BankingBase.navigation.openURL(this.loginViewModel.locatorURL)
	}
	
	handleSecurity = (event) => {
		BankingBase.navigation.openURL(this.loginViewModel.securityAndPrivacyURL)
	}
}
