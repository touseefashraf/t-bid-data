import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/website/shared/shared.module'
import { DataService } from './data.service'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'
import { ChartsModule } from 'ng2-charts';
@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: DashboardComponent }
        ]),
        ChartsModule,
    ],
    declarations: [DashboardComponent],
    providers: [ DataService ]
})
export class DashboardModule { }
