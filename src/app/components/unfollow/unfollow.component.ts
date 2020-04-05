import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unfollow',
  templateUrl: './unfollow.component.html',
  styleUrls: ['./unfollow.component.css']
})
export class UnfollowComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  unfollow(userId) {
    
  }
}
