import { SharedModule } from '../website/shared/shared.module';
import { QtoPanelComponent } from './qto-panel.component'
import { QtoSharedModule } from './qto-shared/qto-shared.module'
import { QtoPanelRoutes } from './qto-panel.routing'
import { NgModule } from '@angular/core'

@NgModule({
    imports: [
        QtoSharedModule,
        SharedModule,
        QtoPanelRoutes
    ],
    declarations: [QtoPanelComponent]
})
export class QtoPanelModule { }
