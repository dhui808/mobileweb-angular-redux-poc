import ViewModelBase from '../../../base/ViewModelBase'
import BankingBase from '../../../base/BankingBase'

export default class LoginViewModel extends ViewModelBase {
	
	userId: string = '';
	password: string = '';
	language: string = 'en';
	locatorURL: string;
	securityAndPrivacyURL: string;
	logo: string = BankingBase.imagesPath+ BankingBase.language + '/globebank.png';
		
	constructor() {
		super() 
		
		this.fieldMap = {
			LogoSVG: 'Images.login-logoSVG',
			CardNumber: 'Login.CardNumber',
			Password: 'Login.Password',
            SaveToggle: 'Login.SaveToggle',
            ResetPassword: 'Login.ResetPassword',
            SignIn: 'Login.SignIn',
            ContactUs: 'ContactUs',
            Locator: 'Login.Locator',
            Security: 'Login.Security',
            Activate: 'Login.Activate',
            LocatorURL: 'URLs.locator',
			securityAndPrivacyURL: 'URLs.securityAndPrivacy'
		}
	}
}
