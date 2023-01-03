import { PlanHoldersComponent } from './plan-holders/plan-holders.component';
import { QuantityTakeoffVideoComponent } from './quantity-takeoff-video/quantity-takeoff-video.component';
import { QuantityTakeoffsComponent } from './quantity-takeoffs/quantity-takeoffs.component';
import { PlansComponent } from './plans/plans.component';
import { SpecsComponent } from './specs/specs.component';
import { AddendumDocsComponent } from './addendum-docs/addendum-docs.component';
import { OtherDocsComponent } from './other-docs/other-docs.component';
import { OwnerComponent } from './owner/owner.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SampleProjectComponent } from './sample-project.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SampleProjectComponent,
        children: [
            {
                path: 'details',
                component: ProjectDetailsComponent
            },
            {
                path: 'owner',
                component: OwnerComponent
            },
            {
                path: 'specs',
                component: SpecsComponent
            },
            {
                path: 'plans',
                component: PlansComponent
            },
            {
                path: 'qtyoff',
                component: QuantityTakeoffsComponent
            },
            {
                path: 'addendums',
                component: AddendumDocsComponent
            },
            {
                path: 'others',
                component: OtherDocsComponent
            },
            {
                path: 'qtyvid',
                component: QuantityTakeoffVideoComponent
            },
            {
                path: 'planholders',
                component: PlanHoldersComponent
            }
        ]
    }
]

export const SampleProjectRoutes = RouterModule.forChild(routes);
