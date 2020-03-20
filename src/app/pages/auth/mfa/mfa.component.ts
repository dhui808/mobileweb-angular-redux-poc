import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { switchMap }      from 'rxjs/operators';

import PageBase from '../../../base/PageBase'
import ViewModelBase from '../../../base/ViewModelBase'
import MfaController from './MfaController'
import MfaViewModel from './MfaViewModel'

import { IAppState } from '../../../store/state/app.state'
import { selectMfaQuestion } from '../../../store/selectors/mfa-question.selector';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent extends PageBase implements OnInit {

	controller: MfaController
	viewModel: any
	
	mfaQuestion$ = this._store.pipe(select(selectMfaQuestion));
	
	constructor(private _store: Store<IAppState>, public router: Router, private route: ActivatedRoute) {
		super()
	}

	ngOnInit() {
		this.controller = new MfaController(this, this._store)
		this.viewModel = this.controller.mfaViewModel
		this.setMfaQuestion();
		this.doTranslation()
	}

	getViewModel(): ViewModelBase {
		return this.viewModel
	}
  
	setMfaQuestion() {
		this.route.params.subscribe((params) => {
			this.viewModel.setMfaQuestion(params['question'])
		});
	}
}
