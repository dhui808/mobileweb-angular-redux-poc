import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import BankingBase from '../../base/BankingBase'

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css']
})
export class UnderConstructionComponent implements OnInit {
  logo: string = BankingBase.imagesPath + 'under-construction.jpeg';

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
	    this.location.back();
  }
}
