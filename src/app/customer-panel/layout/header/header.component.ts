import { ActivatedRoute, Params, Router } from '@angular/router'
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown'
import { ApiService } from '../../../services/api.service'
import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core'
import { ConstantsService } from 'src/app/services/constants.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: false, autoClose: true } }]
})
export class HeaderComponent implements OnInit, AfterViewInit {
    isCollapsed = true
    carSubscribe: any
    isAuthenticated = false
    isCustomer = false
    isQto = false
    isAdmin = false
    isDeo = false
    cart: any
    filters: any = {
        title: '',
        country:''
    }

    constructor(
        public api: ApiService,
        public cs: ConstantsService,
        public router: Router,
        private route: ActivatedRoute,
        public renderer2: Renderer2
    ) {

        this.route.queryParams.subscribe((param: Params) => {
            if (param.country) {
                this.filters.country = param.country
            } else {
                this.filters.country = 'USA'
            }
        })

        api.userLoggedInObs.subscribe(m => {
            this.isAuthenticated = m
            if (this.isAuthenticated) {
                this.loginUpdates()
            }
        })

        this.carSubscribe = this.api.cartItmes.subscribe(resp => {
            this.cart = resp
        })
        // if (this.api.cartData != null) {
        //     this.cart = this.api.cartData.documents.length
        // }
    }
    loginUpdates(): void {
        this.isCustomer = this.api.isCustomer()
        this.isAdmin = this.api.isAdmin()
        this.isQto = this.api.isQto()
        this.isDeo = this.api.isDeo()
    }
    ngOnInit() {
    }
    redirectToSearch() {
        const filtersParam = {
            country: this.filters.country,
            title: this.filters.title,
            page: 1
        }
        this.router.navigate(['/search'], { queryParams: filtersParam, replaceUrl: true })
    }
    ngAfterViewInit() {
    }

    logOut(): void {
        this.api.logOutSession().subscribe((resp: any) => {
            const check = this.api.logOut()
            if (check) {
                location.reload()
            }
        })
    }
}
