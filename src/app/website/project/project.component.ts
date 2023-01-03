import { ApiService } from 'src/app/services/api.service';
import { Event, Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { DataService } from './data.service'
import { Component, ElementRef, OnInit } from '@angular/core'
import { appURL, subbdingUrl } from '../../../environments/environment'
import * as moment from 'moment';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
    projectId: any
    projectDetails: any
    count: any
    countStatus: any = 'fetching'
    userType: any
    moment = moment
    sbUrl = subbdingUrl
    subBid:any = ''
    constructor(
        public data: DataService,
        private router: Router,
        private route: ActivatedRoute,
        private api: ApiService
    ) {
        this.userType = api.user.user_type
        this.projectId = this.route.snapshot.paramMap.get('id')
        this.data.pId = this.projectId
        
        const params = {
            id: this.projectId
        }
        this.data.getProjectDetails(params).subscribe((res: any) => {
            this.count = res.data
            this.countStatus = 'done'
            this.subBid = res.data.subbid_id
            this.data.projectDetails = res.data.project_detail
            this.data.projectPlanHolders = res.data.project_plan_holders
            this.data.dataStatus = 'done'
        })
        this.router.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationEnd) {
                const curRoute = routerEvent.url.split('/').pop()
                this.selectTab(curRoute)
            }
        })
    }

    ngOnInit() {

    }

    selectTab(key: string) {
        const keysOfTabs = Object.keys(this.data.tabs)
        keysOfTabs.forEach((value, index) => {
            this.data.tabs[value] = ''
        })
        this.data.tabs[key] = 'active'
    }
    printPage() {
        window.print()
    }

    ifSubscribedToSubbding() {

        if (this.api.user.id > 0) {
            this.data.getSubbiddingSubStatus({}).subscribe((res: any) => {
                if (res.success === false) {

                    this.router.navigate(['/subbidding-plans'])

                } else {
                    window.open(this.sbUrl+'/customer/rfq/'+this.subBid+'/project-details'+'/'+res.data.token)
                }
            })
        } else {
            this.router.navigate(['/login'])
        }

    }
    ifSubscribedToSubbdingMakeRFQ() {

        if (this.api.user.id > 0) {
            this.data.getSubbiddingSubStatus({}).subscribe((res: any) => {
                if (res.success === false) {

                    this.router.navigate(['/subbidding-plans'])

                } else {
                   // console.log(localStorage.token)
                    window.open(this.sbUrl+'/project-to-rfq/'+this.data.projectDetails.id+'/'+res.data.token)
                }
            })
        } else {
            this.router.navigate(['/login'])
        }

    }
}
