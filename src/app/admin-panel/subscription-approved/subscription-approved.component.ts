import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { Component, OnInit, TemplateRef } from '@angular/core'
import { DataService } from './data.service'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-subscription-approved',
    templateUrl: './subscription-approved.component.html',
    styleUrls: ['./subscription-approved.component.scss']
})
export class SubscriptionApprovedComponent implements OnInit {
    paymentType = 'cheque'
    moment = moment
    dateFormat: any
    requestList: any = []
    dataStatus = 'onway'
    selectedId: any
    selectedIndex: any
    modalRef: BsModalRef
    loaderOptions = {
        rows: 5,
        cols: 8,
        colSpans: {
            0: 1,
        }
    }
    acceptLoading = false
    rejectLoading = false
    constructor(
        public ds: DataService,
        public alert: IAlertService,
        private ms: BsModalService,
        public cs: ConstantsService,
        public api: ApiService,
        public route: Router
    ) {
        this.dateFormat = cs.DATE_TIME_FORMAT.SHORT_DATE
        this.getList()
    }

    ngOnInit() {
        if (this.api.user.id > 1) {
            this.route.navigate(['/admin/dashboard'])

            return false
        }
    }

    getList() {
        this.dataStatus = 'fetching'
        this.ds.getList().subscribe((resp: any) => {
            if (resp.success == false) {
                this.alert.error(resp.error.general)

                return false
            } else {
                this.requestList = resp.data
                this.dataStatus = 'done'
            }
        })
    }
    approveRequestConfirmation(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    rejectRequestConfirmation(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }
    acceptRequest() {
        this.acceptLoading = true
        const param = {
            id: this.selectedId
        }

        this.ds.acceptRequest(param).subscribe((resp: any) => {
            this.acceptLoading = false
            if (resp.success == false) {
                this.alert.error(resp.error.general)
                this.acceptLoading = false

                return false
            } else {
                this.alert.success('Request Activated successfully')
                this.requestList[this.selectedIndex].status = 'active'
            }
            this.modalRef.hide()
        })
    }

    rejectRequest() {
        this.rejectLoading = true
        const param = {
            id: this.selectedId
        }
        this.ds.rejectRequest(param).subscribe((resp: any) => {
            this.rejectLoading = false
            if (resp.success === false) {
                this.alert.error(resp.error.general)
                this.rejectLoading = false

                return false
            } else {
                this.alert.success('Request Inactivated successfully')
                this.requestList[this.selectedIndex].status = 'inactive'
            }
            this.modalRef.hide()
        })
    }
}
