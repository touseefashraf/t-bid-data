import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { QtoSidebarService } from './qto-sidebar.service'

@Component({
    selector: 'app-qto-sidebar',
    templateUrl: './qto-sidebar.component.html',
    styleUrls: ['./qto-sidebar.component.css'],
    animations: [
        trigger('slide', [
            state('up', style({ height: 0 })),
            state('down', style({ height: '*' })),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class QtoSidebarComponent implements OnInit {
    menus = []
    user: any
    constructor(public sidebarservice: QtoSidebarService, private api: ApiService) {
        this.user = this.api.user
        this.menus = sidebarservice.getMenuList()
    }

    ngOnInit() {
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState()
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown') {
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active
                } else {
                    element.active = false
                }
            })
        }
    }

    getState(currentMenu) {

        if (currentMenu.active) {
            return 'down'
        } else {
            return 'up'
        }
    }

    hasBackgroundImage() {
        return this.sidebarservice.hasBackgroundImage
    }

    logOut(): void {
        const check = this.api.logOut()
        if (check) {
            location.reload()
        }
    }
}
