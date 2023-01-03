import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class QtoSidebarService {
    toggled = false
    _hasBackgroundImage = true
    menus = [
        {
            title: 'Dashboard',
            link: 'dashboard',
            icon: 'fa fa-tachometer-alt',
            active: true,
            type: 'simple'
        },
        {
            title: 'Projects',
            link: 'projects',
            icon: 'fa fa-briefcase',
            active: true,
            type: 'simple'
        },
    ] // menu

    constructor() { }

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
