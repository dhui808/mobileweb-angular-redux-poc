import BankingBase from './BankingBase'

export default abstract class EventHandler {
	minSplitWidth: number = 40.063;
	fontSize: string = window.getComputedStyle(document.body).fontSize;
	accountDetailsOnly: boolean = false;
	activeButton: any = null;
		
	abstract getOriginatingPage(): any;
	abstract onSubmitSuccess(result: any): void;
	
	constructor() {
		window.onresize = this.handleResize;
	}
	
	executeSubmit = (fromPage, params, event): void => {
		// double-click protection
		if (event) {
			event.preventDefault();
			if (event.target.disabled === true) {
				return;
			}
			event.target.disabled = true;
			this.activeButton = event.target;
		}
		BankingBase.loadingBar.start();
		BankingBase.restProxy.sendRequest(fromPage, params, this.onSuccess, this.onFailure, this.onNetworkFailure);
	}
	
    handleConfirmationNotification = (message) => {
        console.log(message)
        BankingBase.notificationBar.handleConfirmation(message)
    }
    
    handleErrorNotification = (message) => {
        console.log(message)
        BankingBase.notificationBar.handleError(message)
    }
    
    handleNetworkErrorNotification = (data) => {
        console.log(data)
        BankingBase.notificationBar.handleNetworkError(data)
    }
    
	onSuccess = (result) => {
		// enable button
		if (this.activeButton) {
			this.activeButton.disabled = false;
		}
		if (!result || !result.context || !result.context.next || result.context.next.length === 0) {
			// let the controller decide what to do
			this.onSubmitSuccess(result);
			BankingBase.loadingBar.stop();
			return;
		}
		
		let next = result.context.next[0]
		let nextAction = next.action;
		let params = next.params;
		
		if(typeof params === 'undefined') {
			params = null;
		}
		
		if (BankingBase.navigation.isNavigatable(nextAction)) {
			BankingBase.navigation.navigateTo(nextAction, this.getOriginatingPage(), null, params);
			BankingBase.loadingBar.stop();
		} else {
			BankingBase.restProxy.sendRequest(nextAction, params, this.onSuccess, this.onFailure, this.onNetworkFailure);
		}
	}
	
	onFailure = (response) => {
		// enable button
		if (this.activeButton) {
			this.activeButton.disabled = false;
		}
		console.log('submit failed.')
		BankingBase.loadingBar.stop();
		this.handleErrorNotification(response.exception.message)
	}
	
	onNetworkFailure = (data) => {
		// enable button
		if (this.activeButton) {
			this.activeButton.disabled = false;
		}
		console.log('network problem.')
		BankingBase.loadingBar.stop();
		this.handleNetworkErrorNotification(data)
	}
	
	changeTab = (selectedTabId, contentId, component) => {
		let tablinks = document.getElementsByClassName('tab-title');
		Array.from(tablinks).map((tab) => {
	        tab.className = tab.className.replace(' active', '');
	    })
		let anchors = document.querySelectorAll('.tab-title > a');
		let i;
		for (i = 0; i < anchors.length; i++) {
			if (anchors[i].id === selectedTabId) {
				anchors[i].parentElement.className += ' active';
				break;
			}
		}
		
		let tabcontent = document.getElementsByClassName('tabs-content')[0];
		let content = tabcontent.getElementsByClassName('content')
	    Array.from(content).map((tab) => {
	    	tab.className = tab.className.replace(' active', '');
	    })
	    
	    let tabs = document.getElementById(contentId).className += ' active';
	}
	
	handleResize = () => {
		let variableHeight = Array.from(document.getElementsByClassName('variableHeight'));
		let detailsVisibility = Array.from(document.getElementsByClassName('detailsVisibility'));
		let toggleTopbar = document.getElementsByClassName('toggle-topbar')[0];
		BankingBase.menuIconDisplayed = window.getComputedStyle(toggleTopbar,null).getPropertyValue('display') !== 'none';
		
		if (this.isWideView()) {
			variableHeight.map((element, index) => {
				if (!element.classList.contains('height100')) {
					element.classList.add('height100')
				}
			})
			
			detailsVisibility.map((element, index) => {
				if (element.classList.contains('hiddenDisplay')) {
					element.classList.remove('hiddenDisplay')
				}
			})
		} else if (this.accountDetailsOnly === true) {
			variableHeight.map((element, index) => {
				element.classList.remove('height100')
			})
			
			detailsVisibility.map((element, index) => {
				if (element.classList.contains('hiddenDisplay')) {
					element.classList.remove('hiddenDisplay')
				}
			})
		} else {
			variableHeight.map((element, index) => {
				element.classList.remove('height100')
			})
			
			detailsVisibility.map((element, index) => {
				if (!element.classList.contains('hiddenDisplay')) {
					element.classList.add('hiddenDisplay')
				}
			})
		}
	}
	
	windowWidth = () => {
		return document.documentElement.clientWidth
	}
	
	windowHeight = () => {
		return document.documentElement.clientHeight
	}
	
	windowsize = () => {
		return this.windowWidth() / parseFloat(this.fontSize)
	}
	
	isWideView = () => {
		return this.windowsize() > this.minSplitWidth
	}
}
