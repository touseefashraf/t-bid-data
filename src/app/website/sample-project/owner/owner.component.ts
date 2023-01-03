import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {
    data = []
    dataStatus = 'fetch'
    constructor(
        public ds: DataService
    ) {
        this.ds.getSampleProject().subscribe((resp: any) => {
            this.data = resp.data.project.project_owner
            this.dataStatus = 'done'
            this.ds.dataStatus = 'done'
        })

    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.ds.dataStatus = 'fetching'
    }
}
