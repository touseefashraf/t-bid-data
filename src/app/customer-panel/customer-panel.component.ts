import { ApiService } from 'src/app/services/api.service'
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import { Event, Router, NavigationEnd } from '@angular/router'
import { NgScrollbar } from 'ngx-scrollbar'

@Component({
    selector: 'app-customer-panel',
    templateUrl: './customer-panel.component.html',
    styleUrls: ['./customer-panel.component.css']
})
export class CustomerPanelComponent implements OnInit, AfterViewInit {
    @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar
    isLoading: boolean
    scrollbarSub: any

    constructor(
        private route: Router,
        public api: ApiService
    ) {
    }

    ngOnInit() {
        this.route.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationEnd) {
                window.scrollTo(0, 0)
            }
        })
    }


    ngAfterViewInit(): void {
        this.scrollbarSub = this.scrollbarRef.scrolled
        .subscribe(e => {
            const getHight = e.target.scrollHeight - e.target.scrollTop
            if ((getHight - e.target.clientHeight) < 500) {
                this.api.toggleScrollBottom(true)
            } else {
                this.api.toggleScrollBottom(false)
            }
        })
    }

}
