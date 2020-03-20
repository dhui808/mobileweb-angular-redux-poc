import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'

export default class I18n {
	
	// init should be called when the application is loaded
	init = (lng, context_root) => {
		  
		i18next
		  .use(XHR)
		  .init({
		    backend: {
				loadPath: 'assets/locales/{{lng}}/{{ns}}.json'
		    },
		    lng: lng,
		    fallbackLng: 'en'
		  })
	}
	
	changeLanguage = (lng, updateContent) => {
		i18next.changeLanguage(lng, function(err, t) {updateContent(t)});
	}
	
	t = (key) => {
		return i18next.t(key)
	}
}
