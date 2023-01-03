import { trigger, transition, style, animate } from '@angular/animations'
import { ApiService } from './../services/api.service'
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router'
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core'
import { NgScrollbar } from 'ngx-scrollbar'
import { WebsiteService } from '../services/website.service';
import { environment } from '../../environments/environment';
@Component({
    selector: 'app-website',
    templateUrl: './website.component.html',
    styleUrls: ['./website.component.css'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('500ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate('500ms ease-in', style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class WebsiteComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar
    isLoading: boolean
    scrollbarSub: any

    constructor(
        private route: Router,
        public api: ApiService,
        public web: WebsiteService
    ) {
    }

    ngOnInit() {
        this.route.events.subscribe((routerEvent: Event) => {
            if (routerEvent instanceof NavigationEnd) {
                this.scrollbarRef.scrollTo({ top: 0, duration: 500 })
            }
        })

        if (environment.production === true) {
            this.initiateTawkTo()
        }
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

    initiateTawkTo() {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        const s1 = document.createElement("script")
        const s0 = document.getElementsByTagName("script")[0]
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5db1b395df22d91339a0dee7/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    }

    ngOnDestroy(): void {
        this.scrollbarSub.unsubscribe()
    }
}
