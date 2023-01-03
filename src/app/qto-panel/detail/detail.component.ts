import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service'
import { IAlertService } from '../../libs/ialert/ialerts.service'
import { ConstantsService } from '../../services/constants.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit } from '@angular/core'
import { DataService } from './data.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment'
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    specs = []
    qto = []
    other = []
    plan = []
    addendum = []
    dataStatus = 'fetching'
    projectId: any
    p: any
    activeTab = "detailTab"
    spinnerSVG = `/assets/images/spinner.svg`
    constructor(
        public ds: DataService,
        private route: ActivatedRoute,
        public alert: IAlertService,
    ) {
        if(this.route.snapshot.paramMap.get('qto')) {
            this.activeTab = 'qtoTab'
        }
        this.projectId = this.route.snapshot.paramMap.get('id')
        const params = {
            id: this.projectId
        }
        this.ds.detail({ id: this.projectId }).subscribe((resp: any) => {
            this.p = resp.data

            this.p.documents.forEach((res, index) => {

                if (res.document_type == 'spec') {
                    this.specs.push(res)
                }
                if (res.document_type == 'qto') {
                    this.qto.push(res)
                }
                if (res.document_type == 'plan') {
                    this.plan.push(res)
                }
                if (res.document_type == 'addendum') {
                    this.addendum.push(res)
                }
                if (res.document_type == 'other') {
                    this.other.push(res)
                }
            });

            
            this.dataStatus = 'done'
        })
    }


    ngOnInit(): void {
    }

}