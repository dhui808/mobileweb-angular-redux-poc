import ViewModelBase from '../../../base/ViewModelBase'

export default class MfaViewModel extends ViewModelBase {

	answer: string;
	question: string;
	
	constructor() {
		super()
		this.answer = '';
		
		this.fieldMap = {
			MFASecurityQuestion: "MFA.SecurityQuestion",
			PleaseSelectAQuestion: "Validation.PleaseSelectAQuestion",
            MFAAnswer :"MFA.Answer",
            MFADisclaimer :"MFA.Disclaimer",
            Continue:"Continue"
		}
	}
	
	setMfaQuestion = (question) => {
		this.question = question;
	}
}