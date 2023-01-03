import { IAlertService } from '../../libs/ialert/ialerts.service';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { DataService } from './data.service'
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
    selector: 'app-private-projects',
    templateUrl: './private-projects.component.html',
    styleUrls: ['./private-projects.component.css']
})
export class PrivateProjectsComponent implements OnInit {
    privateProjectList: any = []
    moment = moment
    selectedIndex = -1
    selectedId = -1
    pagination: any
    fetching = true
    page = 1
    constructor(
        public ds: DataService,
        private route: ActivatedRoute,
        private router: Router,
        
    ) {
        this.route.queryParams.subscribe((param: Params) => {
            if (param.page) {
                this.page = param.page
            }
            if (param) {
                this.getList()
            } else {
                this.getList()
            }
        })

    }

    setPagination(page: number) {
        const param = {
            page
        }
        this.router.navigate(['/customer/private-projects'], { queryParams: param, replaceUrl: true })
    }

    getList() {
        const params = {
            page: this.page
        }
        this.ds.getPrivateProjects(params).subscribe((resp: any) => {
            if (resp.success == true) {
                this.privateProjectList = resp.data.data
                this.pagination = resp.data
                this.fetching = false
                this.router.navigate(['/customer/private-projects'], { queryParams: params, replaceUrl: true })
            }
        })
    }

    ngOnInit() {
    }

}
