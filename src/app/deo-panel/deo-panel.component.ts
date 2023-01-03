import { DeoSidebarService } from './deo-shared/deo-sidebar/deo-sidebar.service';
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-deo-panel',
    templateUrl: './deo-panel.component.html',
    styleUrls: ['./deo-panel.component.css']
})
export class DeoPanelComponent implements OnInit {

    constructor(
        public sidebarservice: DeoSidebarService
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
