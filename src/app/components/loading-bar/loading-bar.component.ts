import { Component, OnInit } from '@angular/core';
import BankingBase from '../../base/BankingBase'

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

	favicon: string = BankingBase.imagesPath + 'favicon.ico';
	visiblility: string = 'hidden'
		
	constructor() {
        // add a ref to the LoadingBar in the page component so the LoadingBar can be manipulated later
        BankingBase.loadingBar = this;
	}
	
	start = () => {
		this.visiblility = 'visible'
	}
	
	stop = () => {
		this.visiblility = 'hidden'
	}

	ngOnInit() {
	}

}
