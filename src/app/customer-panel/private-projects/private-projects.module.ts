import { RouterModule } from '@angular/router';
import { CustomerSharedModule } from '../customer-shared/customer-shared.module';
import { SharedModule } from '../../website/shared/shared.module';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrivateProjectsComponent } from './private-projects.component'
import { DataService } from './data.service'


@NgModule({
    imports: [
        SharedModule,
        CustomerSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: PrivateProjectsComponent
            }
        ])
    ],
    declarations: [PrivateProjectsComponent],
    providers: [DataService]
})
export class PrivateProjectsModule { }
