import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-component-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    @Input() status = true
    constructor() { }

    ngOnInit() {
    }

}
