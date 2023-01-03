import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from './data.service'
import { ApiService } from 'src/app/services/api.service';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
    flag: boolean = false
    dataStatus = 'fetching'
    plansList: any = []
    userType = ''
    susbcriptionError = ''
    checkSubRange = true
    subsRangeData: any
    subscriptionText = 'Subscribe'
    selectedPlan: any = {}
    modalRef: BsModalRef
    selectedCall = ''
    waiting = {
        loader: false
    }
    selectedIndex = -1
    constructor(
        public ds: DataService,
        public api: ApiService,
        private alert: IAlertService,
        private ms: BsModalService,
    ) {
        this.api.activeTab = 'plans'
        this.userType = api.user.user_type
        this.ds.getPlans().subscribe((resp: any) => {
            this.plansList = resp.data
            this.plansList.forEach((element, index, array) => {
                if (index == 0) {
                    // this.plansList[index].flag = true
                    this.plansList[index].flag = false
                } else {
                    this.plansList[index].flag = false
                }
            })
            // Call for check subscriotion
            if (this.api.user.user_type == 'customer') {
                this.ds.checkSubRange().subscribe((resp: any) => {
                    if (resp.success == true) {
                        this.checkSubRange = true
                        this.subsRangeData = resp.data
                        if (resp.msg == 'Error') {
                            this.susbcriptionError = 'You have reached your limit, please resubsribe to  download the documents.'
                            this.checkSubRange = false
                        }
                    } else {
                        this.checkSubRange = false
                        this.susbcriptionError = resp.errors.general
                    }
                    this.dataStatus = 'done'
                })
            } else {
                this.dataStatus = 'done'
            }
            // end subs call
        })
    }

    ngOnInit() {
    }
    openModalSubscription(subscriptionTemplete: TemplateRef<any>, selectedPlan, selectedCall?) {
        this.selectedPlan = selectedPlan
        if (selectedCall) {
            this.selectedCall = selectedCall
        }
        if (this.checkSubRange == true && this.subsRangeData.plan_id) {
            this.selectedCall = 'newSubs'
        }
        this.modalRef = this.ms.show(
            subscriptionTemplete,
            {
                class: 'modal-xl modal-dialog-centered website',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }
    checkdata() {

    }
    subscribePlan(planId) {
        this.waiting.loader = true
        const params = {
            plan_id: planId
        }

        this.ds.subscribePlan(params)
            .subscribe((resp: any) => {
                this.waiting.loader = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    return false
                } else {
                    this.alert.success('Plan subscription request sent successfully!!')
                    this.subsRangeData = {
                        requested: {
                            plan_id: resp.data.plan_id
                        }
                    }
                    this.susbcriptionError = ''
                    this.checkSubRange = true
                }
                this.modalRef.hide()
            })
    }

}
