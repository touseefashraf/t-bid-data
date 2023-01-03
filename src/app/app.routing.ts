import { PageNotFoundComponent } from './website/shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin-panel/admin-panel.module')
        .then(mod => mod.AdminPanelModule)
    },
    {
        path: 'customer',
        loadChildren: () => import('./customer-panel/customer-panel.module')
        .then(mod => mod.CustomerPanelModule)
    },
    {
        path: 'qto',
        loadChildren: () => import('./qto-panel/qto-panel.module')
        .then(mod => mod.QtoPanelModule)
    },
    {
        path: 'deo',
        loadChildren: () => import('./deo-panel/deo-panel.module')
        .then(mod => mod.DeoPanelModule)
    },
    {
        path: '',
        loadChildren: () => import('./website/website.module')
        .then(mod => mod.WebsiteModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: {message: 'From ROOT'}
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutes { }
