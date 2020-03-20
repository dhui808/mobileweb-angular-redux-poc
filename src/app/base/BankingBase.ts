import RestProxy from '../utils/RestProxy'
import Navigation from '../utils/Navigation'
import I18n from '../utils/I18n'

class BankingBase {
	static language: string = 'en';
	static menuIconDisplayed: boolean = false;
	static restProxy: RestProxy = new RestProxy();
	static navigation: Navigation = new Navigation();
	static i18n: I18n = new I18n();
	static CONTEXT_ROOT: string = window.location.pathname;
	static imagesPath: string;
	static loadingBar: any;
	static notificationBar: any;
  
	static init(contextRoot) {
		
		if (BankingBase.CONTEXT_ROOT.endsWith('/')) {
			// if deployed to the root, should use "" instead of "/" as context root
			BankingBase.CONTEXT_ROOT = BankingBase.CONTEXT_ROOT.substring(0, BankingBase.CONTEXT_ROOT.length - 1);
		}
		
		BankingBase.imagesPath =  'assets/images/'
		BankingBase.i18n.init(BankingBase.language, BankingBase.CONTEXT_ROOT)
	}
}

export default BankingBase
