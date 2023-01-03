import { SharedModule } from 'src/app/website/shared/shared.module';
import { OtherDocsComponent } from './other-docs/other-docs.component';
import { AddendumDocsComponent } from './addendum-docs/addendum-docs.component';
import { DataService } from './data.service';
import { OwnerComponent } from './owner/owner.component';
import { SpecsComponent } from './specs/specs.component';
import { QuantityTakeoffsComponent } from './quantity-takeoffs/quantity-takeoffs.component';
import { QuantityTakeoffVideoComponent } from './quantity-takeoff-video/quantity-takeoff-video.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { PlanHoldersComponent } from './plan-holders/plan-holders.component';
import { PlansComponent } from './plans/plans.component';
import { SampleProjectRoutes } from './sample-project.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleProjectComponent } from './sample-project.component';

@NgModule({
    imports: [
        CommonModule,
        SampleProjectRoutes,
        SharedModule
    ],
    declarations: [
        SampleProjectComponent,
        PlanHoldersComponent,
        PlansComponent,
        ProjectDetailsComponent,
        QuantityTakeoffsComponent,
        QuantityTakeoffVideoComponent,
        SpecsComponent,
        OwnerComponent,
        AddendumDocsComponent,
        OtherDocsComponent
    ],
    providers: [DataService]
})
export class SampleProjectModule { }
