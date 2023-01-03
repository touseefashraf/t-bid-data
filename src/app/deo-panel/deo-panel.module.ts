import { DeoSharedModule } from './deo-shared/deo-shared.module';
import { SharedModule } from '../website/shared/shared.module';
import { DeoPanelComponent } from './deo-panel.component'
import { DeoPanelRoutes } from './deo-panel.routing'
import { NgModule } from '@angular/core'

@NgModule({
    imports: [
        DeoSharedModule,
        SharedModule,
        DeoPanelRoutes
    ],
    declarations: [DeoPanelComponent]
})
export class DeoPanelModule { }
