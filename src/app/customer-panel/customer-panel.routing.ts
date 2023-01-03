import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerGuard } from '../auth/customer-guard'
import { CustomerPanelComponent } from './customer-panel.component'

const routes: Routes = [
    {
        path: '',
        component: CustomerPanelComponent,
        canActivate: [CustomerGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./customer-dashboard/customer-dashboard.module')
                .then(mod => mod.CustomerDashboardModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module')
                .then(mod => mod.ProfileModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module')
                .then(mod => mod.ChangePasswordModule)
            },
            {
                path: 'manage-searches',
                loadChildren: () => import('./manage-searches/manage-searches.module')
                .then(mod => mod.ManageSearchesModule)
            },
            {
                path: 'wish-list',
                loadChildren: () => import('./favourite-project/favourite-project.module')
                .then(mod => mod.FavouriteProjectModule)
            },
            {
                path: 'private-projects',
                loadChildren: () => import('./private-projects/private-projects.module')
                .then(mod => mod.PrivateProjectsModule)
            },
            {
                path: 'downloads',
                loadChildren: () => import('./downloads/downloads.module')
                .then(mod => mod.DownloadsModule)
            },

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerPanelRoutes { }
