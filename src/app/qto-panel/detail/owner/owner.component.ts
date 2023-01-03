import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
    @Input()
    p: any
  constructor() { }

  ngOnInit() {
  }

}
