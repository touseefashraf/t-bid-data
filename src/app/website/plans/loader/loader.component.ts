import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    length: any = [0, 1, 3, 4, 5]
    constructor() { }

    ngOnInit() {
    }

}
