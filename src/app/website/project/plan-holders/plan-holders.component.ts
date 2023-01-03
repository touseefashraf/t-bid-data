import { DataService } from '../data.service'
import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
    selector: 'app-plan-holders',
    templateUrl: './plan-holders.component.html',
    styleUrls: ['./plan-holders.component.css']
})
export class PlanHoldersComponent implements OnInit {
    m = moment
    constructor(
        public ds: DataService
    ) {
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
