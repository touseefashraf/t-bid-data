import { DeoPanelComponent } from './deo-panel.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DeoGuard } from '../auth/deo-guard'

const routes: Routes = [
    {
        path: '',
        component: DeoPanelComponent,
        canActivate: [DeoGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(mod => mod.DashboardModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module')
                    .then(mod => mod.ChangePasswordModule)
            },
            {
                path: 'project/publish',
                loadChildren: () => import('../common-modules/project/addedit-project/addedit-project.module')
                .then(mod => mod.AddeditProjectModule)
            },
            {
                path: 'project/list',
                loadChildren: () => import('../common-modules/project/list-project/list-project.module')
                    .then(mod => mod.ListProjectModule)
            },
            {
                path: 'project-owners',
                loadChildren: () => import('./project-owners/project-owners.module')
                    .then(mod => mod.ProjectOwnersModule)
            },
            {
                path: 'plan-holder',
                loadChildren: () => import('./plan-holder/plan-holder.module')
                    .then(mod => mod.PlanHolderModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeoPanelRoutes { }
