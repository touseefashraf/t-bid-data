import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
import { DataService } from '../data.service'

@Component({
    selector: 'app-plan-holder-project',
    templateUrl: './plan-holder-project.component.html',
    styleUrls: ['./plan-holder-project.component.css']
})
export class PlanHolderProjectComponent implements OnInit {
    @Input()
    planHolder: any
    @Input()
    projectId: any
    moment = moment

    dateFormat: any
    constructor(
        public cs: ConstantsService,
        public ds: DataService
    ) {
        this.dateFormat = cs.DATE_TIME_FORMAT.DOC_DATE

    }
    ngOnInit() {
    }
}
