import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-loader',
  templateUrl: './search-loader.component.html',
  styleUrls: ['./search-loader.component.css']
})

export class SearchLoaderComponent implements OnInit {
length:any  = [0,1,3,4,5]
  constructor() { }

  ngOnInit() {
  }

}
