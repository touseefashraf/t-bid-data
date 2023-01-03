import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { CustomerSharedModule } from './../customer-shared/customer-shared.module'
import { SharedModule } from './../../website/shared/shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ManageSearchesComponent } from './manage-searches.component'
import { DataService } from './data.service'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [
        SharedModule,
        CustomerSharedModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: ManageSearchesComponent
            }
        ])
    ],
    declarations: [ManageSearchesComponent],
    providers: [DataService]
})
export class ManageSearchesModule { }
