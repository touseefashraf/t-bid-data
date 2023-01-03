import { SharedModule } from './../shared/shared.module'
import { OthersComponent } from './others/others.component'
import { AddendumComponent } from './addendum/addendum.component'
import { ProjectRoutes } from './project.routing'
import { DataService } from './data.service'
import { SpecsComponent } from './specs/specs.component'
import { QuantityTakeoffsComponent } from './quantity-takeoffs/quantity-takeoffs.component'
import { QuantityTakeoffVideoComponent } from './quantity-takeoff-video/quantity-takeoff-video.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'
import { PlanHoldersComponent } from './plan-holders/plan-holders.component'
import { PlansComponent } from './plans/plans.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectComponent } from './project.component'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [
        CommonModule,
        ProjectRoutes,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        ProjectDetailsComponent,
        PlanHoldersComponent,
        PlansComponent,
        ProjectComponent,
        AddendumComponent,
        OthersComponent,
        QuantityTakeoffsComponent,
        QuantityTakeoffVideoComponent,
        SpecsComponent
    ],
    providers: [DataService],
    entryComponents: [ProjectComponent]
})
export class ProjectModule { }
