import { ApiService } from 'src/app/services/api.service';
import { Event, Router, NavigationEnd } from '@angular/router';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sample-project',
    templateUrl: './sample-project.component.html',
    styleUrls: ['./sample-project.component.css']
})
export class SampleProjectComponent implements OnInit {
    counters = {
        specCount: 0,
        qtoCount: 0,
        addendumCount: 0,
        otherCount: 0,
        planCount: 0
    }
    // data.dataStatus = 'fetching'
    projectDetails: any = {}
    constructor(public data: DataService, private router: Router, public api: ApiService) {
        this.api.activeTab = 'sampleProjects'
        this.data.getSampleProject().subscribe((res: any) => {
            this.data.dataStatus = 'done'
            this.projectDetails = res.data.project
            this.data.pId = res.data.project.id
            this.counters.addendumCount = res.data.addendum_count
            this.counters.specCount = res.data.specs_count
            this.counters.otherCount = res.data.other_count
            this.counters.qtoCount = res.data.qto_count
            this.counters.planCount = res.data.plan_count
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
}
