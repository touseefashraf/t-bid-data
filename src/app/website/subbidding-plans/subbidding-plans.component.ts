import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from './data.service'
import { ApiService } from 'src/app/services/api.service';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { appURL } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-plans',
    templateUrl: './subbidding-plans.component.html',
    styleUrls: ['./subbidding-plans.component.css']
})
export class SubbiddingPlansComponent implements OnInit {
    dataStatus = 'fetching'
    plansList: any = []
    userType = ''
    susbcriptionError = ''
    checkSubRange = true
    subsRangeData: any
    subscriptionText = 'Subscribe'
    selectedPlan: any = {}
    selectedCall = ''
    tbdUrl = appURL

    userToken: any = ''
    waiting = {
        loader: false
    }
    selectedIndex = -1
    constructor(
        public ds: DataService,
        public api: ApiService,
        private alert: IAlertService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.subsRangeData = this.api.user.subbidding_plans_subscriber
        this.api.activeTab = 'plans'
        this.userType = api.user.user_type

    }

    ngOnInit() {
        if (this.route.snapshot.paramMap.get('token')) {
            this.userToken = this.route.snapshot.paramMap.get('token')
        }

        this.ds.getPlansList(this.userToken).subscribe((resp: any) => {
            this.plansList = resp.data.subbidding_plans
            if (resp.data.token) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('user', JSON.stringify(resp.data.user))
                this.api.userLoggedInSource.next(true)
                //this.router.navigate(['/subbidding-plans/'])
                window.location.href = '/subbidding-plans/'
            }

            this.dataStatus = 'done'
        })

    }

    makeSubscriptionRequest(id) {
        if (this.userType !== 'customer') {
            window.location.href = this.tbdUrl + '/login'
        }
        if (this.userType === 'customer') {

            const params = { id: id }
            this.ds.makeSubRequest(params)
                .subscribe((resp: any) => {
                    this.waiting.loader = false
                    if (resp.success === false) {
                        this.alert.error(resp.errors.general)

                        return false
                    } else {
                        window.location.href = resp.data

                        return false
                    }
                })
        }

    }


}
