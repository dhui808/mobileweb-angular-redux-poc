import ViewModelBase from '../../base/ViewModelBase'
import BankingBase from '../../base/BankingBase'

export default class NavBarViewModel extends ViewModelBase {
	
	logo: string
	menuIcon: string
	menuItems: any[] = []

	constructor() {
		super()
		this.logo = BankingBase.imagesPath+ BankingBase.language + '/globebank-logo.png';
		this.menuIcon = 'assets/images/menu.png';
		
		this.fieldMap = {
			Accounts: 'Accounts',
			MoveMoney: 'MoveMoney',
            Locator :'Locator',
            ContactUs :'ContactUs',
            Settings:'Settings',
            Logout:'Logout'
		}
		
		let t = BankingBase.i18n.t
		
		this.menuItems = [];
		this.menuItems.push(new MenuItem(this,'/accounts', t(this.fieldMap['Accounts']), 'menu-accounts'));
		this.menuItems.push(new MenuItem(this,'/move-money', t(this.fieldMap['MoveMoney']), 'menu-move-money'));
		this.menuItems.push(new MenuItem(this,'/locator', t(this.fieldMap['Locator']), 'menu-locator'));
		this.menuItems.push(new MenuItem(this,'/contact-us', t(this.fieldMap['ContactUs']), 'menu-contact'));
		this.menuItems.push(new MenuItem(this,'/settings', t(this.fieldMap['Settings']), 'menu-settings'));
		this.menuItems.push(new MenuItem(this,'/logout', t(this.fieldMap['Logout']), 'menu-logout'));
		// for angular, have to reverse the menu order
		this.menuItems.reverse();
	}
	
	toggleMenu = () => {
		
		// toggle menu only when it is displayed.
		if (!BankingBase.menuIconDisplayed) {
			return;
		}
		
		let div = document.getElementsByClassName('top-bar')[0];
		if (div.classList.contains('expanded')) {
			div.classList.remove('expanded');
		} else {
			div.classList.add('expanded');
		}
	}
}

class MenuItem {
	
	navBarViewModel: any
	path: string
	description: string
	iconClass: string
	
	constructor(navBarViewModel, path, description, iconClass) {
		this.navBarViewModel = navBarViewModel;
		this.path = path;
		this.description = description;
		this.iconClass = 'nav-item ' + iconClass;
	}
	
	handleClick = () => {
		if (location.pathname === (BankingBase.CONTEXT_ROOT + this.path)) {
			this.navBarViewModel.toggleMenu();
		}
	}
}
