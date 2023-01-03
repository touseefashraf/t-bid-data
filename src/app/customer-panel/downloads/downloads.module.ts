import { CustomerSharedModule } from './../customer-shared/customer-shared.module';
import { DataService } from './data.service'
import { SharedModule } from 'src/app/website/shared/shared.module'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { DownloadsComponent } from './downloads.component'

@NgModule({
    imports: [
        SharedModule,
        CustomerSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: DownloadsComponent
            }
        ])
    ],
    declarations: [DownloadsComponent],
    providers: [ DataService ]
})
export class DownloadsModule { }
