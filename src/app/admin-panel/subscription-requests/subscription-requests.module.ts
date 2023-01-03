import { SharedModule } from 'src/app/website/shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SubscriptionRequestsComponent } from './subscription-requests.component'
import { RouterModule } from '@angular/router'
import { DataService } from './data.service'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [
        SharedModule,
        AdminSharedModule,
        ModalModule.forRoot(),
        RouterModule.forChild([
            { path: '', component: SubscriptionRequestsComponent }
        ])
    ],
    declarations: [SubscriptionRequestsComponent],
    providers: [DataService]
})
export class SubscriptionRequestsModule { }
