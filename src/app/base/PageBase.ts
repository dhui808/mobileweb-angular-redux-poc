import BankingBase from './BankingBase'
import ViewModelBase from './ViewModelBase'

abstract class PageBase {
	constructor() {
	}
	
	abstract getViewModel(): ViewModelBase;
	
	updateContent = (t) => {
		// every child defines getViewModel().
		let viewModel = this.getViewModel()
    if (viewModel) {
  		viewModel.updateI18n(t)
    }
	}
	
	changeLanguage = (lng) => {
	    BankingBase.language = lng
		BankingBase.i18n.changeLanguage(lng, this.updateContent)
	} 
  
  doTranslation = () => {
    this.changeLanguage(BankingBase.language)
  } 
}

export default PageBase
