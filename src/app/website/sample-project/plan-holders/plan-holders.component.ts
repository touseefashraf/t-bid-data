import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment'

@Component({
    selector: 'app-plan-holders',
    templateUrl: './plan-holders.component.html',
    styleUrls: ['./plan-holders.component.css']
})
export class PlanHoldersComponent implements OnInit, OnDestroy {
    data = []
    doc: any
    m = moment
    constructor(
        public ds: DataService
    ) {
        this.ds.getSampleProject().subscribe((resp: any) => {
            this.data = resp.data.project.project_plan_holders
            this.ds.dataStatus = 'done'
        })

    }
ngOnDestroy(){
    this.ds.dataStatus = 'fetching'
}
    ngOnInit() {
    }

    getDoc(id, fileType, pId) {
        this.ds.downloadPDF(pId, fileType, id).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });

    }


}
