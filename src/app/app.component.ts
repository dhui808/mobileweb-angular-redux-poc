import { Component } from '@angular/core';
import {PlatformLocation } from '@angular/common';
import BankingBase from './base/BankingBase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(platformLocation: PlatformLocation) {
    let contextRoot = (platformLocation as any).location.href;
    BankingBase.init(contextRoot);
  }
}
