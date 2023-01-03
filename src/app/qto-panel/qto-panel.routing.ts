import { QtoPanelComponent } from './qto-panel.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QtoGuard } from '../auth/qto-guard'

const routes: Routes = [
    {
        path: '',
        component: QtoPanelComponent,
        canActivate: [QtoGuard],
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
                path: 'projects',
                loadChildren: () => import('./list-project/list-project.module')
                    .then(mod => mod.ListProjectModule)
            },
            {
                path: 'detail/:id',
                loadChildren: () => import('./detail/detail.module')
                    .then(mod => mod.DetailModule)
            },
            {
                path: 'detail/:id/:qto',
                loadChildren: () => import('./detail/detail.module')
                    .then(mod => mod.DetailModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QtoPanelRoutes { }
