import { OthersComponent } from './others/others.component'
import { AddendumComponent } from './addendum/addendum.component'
import { PlanHoldersComponent } from './plan-holders/plan-holders.component'
import { QuantityTakeoffVideoComponent } from './quantity-takeoff-video/quantity-takeoff-video.component'
import { QuantityTakeoffsComponent } from './quantity-takeoffs/quantity-takeoffs.component'
import { PlansComponent } from './plans/plans.component'
import { SpecsComponent } from './specs/specs.component'
import { ProjectDetailsComponent } from './project-details/project-details.component'
import { Routes, RouterModule } from '@angular/router'
import { ProjectComponent } from './project.component'

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
        children: [
            {
                path: 'details',
                component: ProjectDetailsComponent
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
                path: 'qtyvid',
                component: QuantityTakeoffVideoComponent
            },
            // {
            //     path: 'planholders',
            //     component: PlanHoldersComponent
            // },
            {
                path: 'addendum',
                component: AddendumComponent
            },
            {
                path: 'others',
                component: OthersComponent
            },
        ]
    }
]

export const ProjectRoutes = RouterModule.forChild(routes)
