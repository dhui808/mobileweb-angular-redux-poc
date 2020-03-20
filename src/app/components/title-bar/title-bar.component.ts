import { Component, OnInit } from '@angular/core';
import BankingBase from '../../base/BankingBase'

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  logo: string
  
  constructor() {
	this.logo = BankingBase.imagesPath + BankingBase.language + "/globebank-logo.png";
  }

  ngOnInit() {
  }
}