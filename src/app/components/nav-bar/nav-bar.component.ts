import { Component, OnInit } from '@angular/core';
import NavBarViewModel from './NavBarViewModel'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  viewModel: NavBarViewModel = new NavBarViewModel()
	
  constructor() {}

  ngOnInit() {
  }

}
