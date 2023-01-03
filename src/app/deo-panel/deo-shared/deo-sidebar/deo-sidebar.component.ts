import { ApiService } from '../../../services/api.service';
import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { DeoSidebarService } from './deo-sidebar.service'

@Component({
    selector: 'app-deo-sidebar',
    templateUrl: './deo-sidebar.component.html',
    styleUrls: ['./deo-sidebar.component.css'],
    animations: [
        trigger('slide', [
            state('up', style({ height: 0 })),
            state('down', style({ height: '*' })),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class DeoSidebarComponent implements OnInit {
    menus = []
    user: any
    constructor(public sidebarservice: DeoSidebarService, private api: ApiService) {
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
