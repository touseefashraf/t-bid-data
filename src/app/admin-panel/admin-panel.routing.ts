import { AdminPanelComponent } from './admin-panel.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminGuard } from '../auth/admin-guard'

const routes: Routes = [
    {
        path: '',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(mod => mod.DashboardModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./admin/admin.module')
                    .then(mod => mod.AdminModule)
            },
            {
                path: 'coupons',
                loadChildren: () => import('./coupons/coupons.module')
                    .then(mod => mod.CouponsModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./change-password/change-password.module')
                    .then(mod => mod.ChangePasswordModule)
            },
            {
                path: 'setting',
                loadChildren: () => import('./setting/setting.module')
                    .then(mod => mod.SettingModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customers/customers.module')
                    .then(mod => mod.CustomersModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module')
                    .then(mod => mod.UsersModule)
            },
            {
                path: 'super-password',
                loadChildren: () => import('./super-password/super-password.module')
                    .then(mod => mod.SuperPasswordModule)
            },
            {
                path: 'contact-us',
                loadChildren: () => import('./contact-us/contact-us.module')
                    .then(mod => mod.ContactUsModule)
            },
            {
                path: 'plan-categories',
                loadChildren: () => import('./plan-categories/plan-categories.module')
                    .then(mod => mod.PlanCategoriesModule)
            },
            {
                path: 'rfq-requests',
                loadChildren: () => import('./rfq-requests/rfq-requests.module')
                    .then(mod => mod.RfqRequestsModule)
            },
            {
                path: 'plans/:id',
                loadChildren: () => import('./plans/plans.module')
                    .then(mod => mod.PlansModule)
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
                path: 'subscription-requests',
                loadChildren: () => import('./subscription-requests/subscription-requests.module')
                    .then(mod => mod.SubscriptionRequestsModule)
            },
            {
                path: 'subscription-downloads',
                loadChildren: () => import('./subscription-approved/subscription-approved.module')
                    .then(mod => mod.SubscriptionApprovedModule)
            },
            {
                path: 'plan-holder',
                loadChildren: () => import('./plan-holder/plan-holder.module')
                    .then(mod => mod.PlanHolderModule)
            },
            {
                path: 'why-us',
                loadChildren: () => import('./why-us/why-us.module')
                    .then(mod => mod.WhyUsModule)
            },
            {
                path: 'discounts',
                loadChildren: () => import('./discounts/discounts.module')
                    .then(mod => mod.DiscountsModule)
            },
            {
                path: 'e-subbidding',
                loadChildren: () => import('./e-subbidding/e-subbidding.module')
                    .then(mod => mod.ESubbiddingModule)
            },
            {
                path: 'contact-us-page',
                loadChildren: () => import('./contact-us-page/contact-us-page.module')
                    .then(mod => mod.ContactUsPageModule)
            },
            {
                path: 'images-adder',
                loadChildren: () => import('./images-adder/images-adder.module')
                    .then(mod => mod.ImagesAdderModule)
            },
            {
                path: 'quote-requests',
                loadChildren: () => import('./quotes/quote-requests/quote-requests.module')
                    .then(mod => mod.QuoteRequestsModule)
            },
            {
                path: 'quote/:id',
                loadChildren: () => import('./quotes/view-quote/view-quote.module')
                    .then(mod => mod.ViewQuoteModule)
            },
            {
                path: 'csi-divisions',
                loadChildren: () => import('./csi-divisions/csi-divisions.module')
                    .then(mod => mod.CsiDivisionsModule)
            },{
                path: 'subbidding-plans',
                loadChildren: () => import('./subbidding-plans/subbidding-plans.module')
                    .then(mod => mod.SubbiddingPlansModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPanelRoutes { }
