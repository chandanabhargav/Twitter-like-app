import { Component, OnInit } from '@angular/core';
//import {$} from 'jquery';
//import {typeahead, Bloodhound} from 'typeahead';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  userName;
  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username')
  }

}
