const PAGE_PATH = Object.freeze({
	LOGIN : '/',
	LOGOUT : '/',
	START : '/',
	MFA_ANSWER : '/mfa',
	ACCOUNT_SUMMARY : '/accounts',
	ACCOUNT_DETAILS : '/accounts/details'
});

export default class Navigation {
    
	navigateTo(path, fromComponent, urlMatchingKey, params) {
		path = urlMatchingKey? PAGE_PATH[path] + '/' + urlMatchingKey : PAGE_PATH[path]
		
		if(params == null || typeof params == 'undefined') {
			fromComponent.router.navigate([path])
		} else {
			fromComponent.router.navigate([path, params])		
		}
		
	}
	
	isNavigatable(path) {
		return PAGE_PATH[path];
	}
	
	openURL(url) {
		window.open(url, '_blank');
	}
}

