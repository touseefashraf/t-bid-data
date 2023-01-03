import { filter } from 'rxjs/operators'
import { ApiService } from '../../services/api.service'
import { IAlertService } from '../../libs/ialert/ialerts.service'
import { ConstantsService } from '../../services/constants.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Component, OnInit } from '@angular/core'
import { DataService } from './data.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment'
@Component({
    selector: 'app-list-project',
    templateUrl: './list-project.component.html',
    styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
    filters = {
        title: ''
    }
    modalRef: BsModalRef
    deletingIndex = -1
    selectedId = -1
    deletePop: any
    page = 1
    pagination: any
    fetching = true
    projectList: any = []
    spinnerSVG = `/assets/images/spinner.svg`
    searchLoading = false
    constructor(
        private modalService: BsModalService,
        private api: ApiService,
        public dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        public alert: IAlertService,
        public cs: ConstantsService
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.page = params.page
                if (params.title) {
                    this.filters.title = params.title
                }
                this.getProjects()
            } else {
                this.getProjects()
            }
        })

    }

    getProjects() {
        this.searchLoading = true
        const filtersParam = {
            page: this.page,
            title: this.filters.title
        }
        this.dataService.list(this.page, this.filters.title)
            .subscribe((resp: any) => {
                this.searchLoading = false
                if (resp.success === false) {
                    return false
                } else {
                    this.projectList = resp.data.data
                    this.pagination = resp.data
                    this.fetching = false
                }
            })
    }

    setPagination(page: number) {
        let filtersParam: any = {}
        filtersParam = {
            page,
            title: this.filters.title
        }
        this.router.navigate(['/qto/projects'], { queryParams: filtersParam, replaceUrl: true })
    }

    ngOnInit(): void {
    }

}