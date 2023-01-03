import { SharedModule } from './../../website/shared/shared.module';
import { NgModule } from '@angular/core'
import { PlanCategoriesComponent } from './plan-categories.component'
import { RouterModule } from '@angular/router'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AdminSharedModule } from '../admin-shared/admin-shared.module'
import { DataService } from './data.service'

@NgModule({
    imports: [
        AdminSharedModule,
        SharedModule,
        FormsModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: PlanCategoriesComponent }
        ])
    ],
    declarations: [PlanCategoriesComponent],
    providers: [DataService]

})
export class PlanCategoriesModule { }
