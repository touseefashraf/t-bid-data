import { Component, OnInit } from '@angular/core'
import { QtoSidebarService } from './qto-shared/qto-sidebar/qto-sidebar.service'

@Component({
    selector: 'app-qto-panel',
    templateUrl: './qto-panel.component.html',
    styleUrls: ['./qto-panel.component.css']
})
export class QtoPanelComponent implements OnInit {

    constructor(
        public sidebarservice: QtoSidebarService
    ) {
    }

    ngOnInit() {
    }

    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState())
    }
    toggleBackgroundImage() {
        this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage
    }
    getSideBarState() {
        return this.sidebarservice.getSidebarState()
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true)
    }
}
