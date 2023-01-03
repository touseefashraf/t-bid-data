import { IAlertService } from './../../libs/ialert/ialerts.service';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { DataService } from './data.service'
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
@Component({
    selector: 'app-favourite-project',
    templateUrl: './favourite-project.component.html',
    styleUrls: ['./favourite-project.component.css']
})
export class FavouriteProjectComponent implements OnInit {
    favProjectList: any = []
    moment = moment
    selectedIndex = -1
    selectedId = -1
    pagination: any
    updateLoading = false
    fetching = true
    page = 1
    modalRef: BsModalRef
    constructor(
        public ds: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private ms: BsModalService,
        public alert: IAlertService
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
        this.router.navigate(['/customer/wish-list'], { queryParams: param, replaceUrl: true })
    }

    openRemoveModal(removeConfirmingTemplate: TemplateRef<any>, id: any, index: any) {
        this.selectedId = id
        this.selectedIndex = index
        this.modalRef = this.ms.show(
            removeConfirmingTemplate,
            {
                class: 'modal-sm website',
                keyboard: false,
                ignoreBackdropClick: true
            }
        )
    }

    removeFav() {
        this.updateLoading = true
        const params = {
            project_id: this.selectedId
        }
        this.ds.removeFromFav(params).subscribe((resp: any) => {
            if (resp.success == true) {

                this.alert.success('Project Removed from Wishlist')
                this.favProjectList.splice(this.selectedIndex, 1)
                this.updateLoading = false
            } else {

                this.alert.error(resp.errors.general)
                this.updateLoading = false
            }
            this.modalRef.hide()
        })
    }

    getList() {
        const params = {
            page: this.page
        }
        this.ds.getFavouriteProjects(params).subscribe((resp: any) => {
            if (resp.success == true) {
                this.favProjectList = resp.data.data
                this.pagination = resp.data
                this.fetching = false
                this.router.navigate(['/customer/wish-list'], { queryParams: params, replaceUrl: true })
            }
        })
    }

    ngOnInit() {
    }

}
