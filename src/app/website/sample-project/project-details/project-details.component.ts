import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    data = []
    dateFormat = this.cs.DATE_TIME_FORMAT.DATE
    moment = moment
    constructor(
        public ds: DataService,
        public cs: ConstantsService

    ) {
        this.ds.printable = true
        this.ds.getSampleProject().subscribe((resp: any) => {
            this.data = resp.data.project
            this.ds.dataStatus = 'done'

        })

    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.ds.printable = false
        this.ds.dataStatus = 'fetching'
    }
}
