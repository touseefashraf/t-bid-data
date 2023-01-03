import { Injectable } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'

@Injectable({
    providedIn: 'root'
})
export class AdminSidebarService {
    toggled = false
    _hasBackgroundImage = true
    menus = []

    constructor(public api: ApiService) {

        this.menus = [
            {
                title: 'Dashboard',
                link: 'dashboard',
                icon: 'fa fa-tachometer-alt',
                active: true,
                type: 'simple'
            },
            {
                title: 'Coupons',
                link: 'coupons',
                icon: 'fas fa-tags',
                active: true,
                type: 'simple'
            },
            {
                title: 'Projects',
                link: 'project/list',
                icon: 'fab fa-r-project',
                active: true,
                type: 'simple'
            },
            {
                title: 'Users',
                link: 'users',
                icon: 'fa fa-users',
                active: true,
                type: 'simple'
            },
            {
                title: 'Customers',
                link: 'customers',
                icon: 'fa fa-users',
                active: true,
                type: 'simple'
            },
            {
                title: 'Contact Us',
                link: 'contact-us',
                icon: 'fa fa-address-book',
                active: true,
                type: 'simple'
            },
            {
                title: 'Quote Requests',
                link: 'quote-requests',
                icon: 'fa fa-address-book',
                active: true,
                type: 'simple'
            },
            {
                title: 'CSI Divisions',
                link: 'csi-divisions',
                icon: 'fa fa-address-book',
                active: true,
                type: 'simple'
            },
            {
                title: 'Content Pages',
                icon: 'fa fa-cc-mastercard',
                active: false,
                type: 'dropdown',
                submenus: [
                    {
                        title: 'Why Us',
                        link: 'why-us',
                        type: 'simple'
                    },
                    {
                        title: 'Discounts',
                        link: 'discounts',
                        type: 'simple'
                    },
                    {
                        title: 'Sub-Bidding',
                        link: 'e-subbidding',
                        type: 'simple'
                    },
                    {
                        title: 'Contact Us Page',
                        link: 'contact-us-page',
                        type: 'simple'
                    },
                    {
                        title: 'Add Company Images',
                        link: 'images-adder',
                        type: 'simple'
                    }
                ]
            },
            {
                title: 'Plans',
                link: 'plan-categories',
                icon: 'fa fa-tasks',
                active: true,
                type: 'simple'
            },
            {
                title: 'Subbidding Plans',
                link: 'subbidding-plans',
                icon: 'fa fa-tasks',
                active: true,
                type: 'simple'
            },
            {
                title: 'RFQ-Requests',
                link: 'rfq-requests',
                icon: 'fa fa-tasks',
                active: true,
                type: 'simple'
            },
            {
                title: 'Plan Holder',
                link: 'plan-holder',
                icon: 'fa fa-tasks',
                active: true,
                type: 'simple'
            },
            {
                title: 'Project Owners',
                link: 'project-owners',
                icon: 'fa fa-briefcase',
                active: true,
                type: 'simple'
            },
            {
                title: 'Change Password',
                link: 'change-password',
                icon: 'fas fa-lock password',
                active: true,
                type: 'simple'
            }
        ] // menu


        if (api.user.id == 1) {
            // this.menus.slice()
            this.menus.splice(8, 0, {
                title: 'Subscription',
                icon: 'fa fa-cc-mastercard',
                active: false,
                type: 'dropdown',
                submenus: [
                    {
                        title: 'Requests',
                        link: 'subscription-requests',
                        type: 'simple'
                    },
                    {
                        title: 'Subscribers',
                        link: 'subscription-downloads',
                        type: 'simple'
                    }
                ]
            });
        }
    }

    toggle() {
        this.toggled = !this.toggled
    }

    getSidebarState() {
        return this.toggled
    }

    setSidebarState(state: boolean) {
        this.toggled = state
    }

    getMenuList() {
        return this.menus
    }

    get hasBackgroundImage() {
        return this._hasBackgroundImage
    }

    set hasBackgroundImage(hasBackgroundImage) {
        this._hasBackgroundImage = hasBackgroundImage
    }
}
