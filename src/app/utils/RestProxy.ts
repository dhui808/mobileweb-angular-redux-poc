import Network from './Network'

const ENDPOINT_PATH = Object.freeze({
	LOGIN : '/banking/rest/auth/login',
	LOGOUT : '/banking/rest/auth/logout',
	MFA : '/banking/rest/auth/mfa/answer',
	ACCOUNT_SUMMARY : '/banking/rest/account/summary',
	ACCOUNT_DETAILS : '/banking/rest/account/details'
});

class RestProxy {
	network: Network = new Network();
	constructor() {
	}
	
	sendRequest = (urlKey, inputParams, onSuccess, onFailure, onNetworkFailure) => {
		let url = ENDPOINT_PATH[urlKey]
		let body = JSON.stringify(inputParams);
		this.network.post(url, body, onSuccess, onFailure, onNetworkFailure)
	}
	
	getRequestUrl(urlKey: string) {
	    return ENDPOINT_PATH[urlKey]
	}
}

export default RestProxy
