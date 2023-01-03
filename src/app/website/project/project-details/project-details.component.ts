import { ConstantsService } from './../../../services/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment'
@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

    bidPhase = ConstantsService.BID_PHASES
    moment = moment
    constructor(
        public ds: DataService,
        public api: ApiService,
        public cs: ConstantsService
    ) {
        this.ds.printable = true
    }

    ngOnInit() {
    }
    ngOnDestroy() {
        this.ds.printable = false
    }
}
