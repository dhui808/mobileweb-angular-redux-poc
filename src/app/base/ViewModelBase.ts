import BankingBase from './BankingBase'

export default class ViewModelBase {
	
	fieldMap: object;
	
	constructor() {
	}
	
	// Dynamically create/updates view model properties with internationalized values.
	// Each child class must have a fieldMap object, which maps field names to i18n lookup keys.
	updateI18n = (t) => {
		let vm = this
		for (let field of Object.keys(vm.fieldMap)) {
			vm[field] = BankingBase.i18n.t(vm.fieldMap[field])
		}
	}
}
