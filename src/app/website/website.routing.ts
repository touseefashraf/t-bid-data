import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { WebsiteComponent } from './website.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WebsiteGuard } from '../auth/website-guard'
import { NoAuthGuard } from '../auth/no-auth-guard'

const routes: Routes = [
    {
        path: '',
        component: WebsiteComponent,
        canActivate: [WebsiteGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./index/index.module')
                    .then(mod => mod.IndexModule)
            },
            {
                path: 'login',
                canActivate: [NoAuthGuard],
                loadChildren: () => import('./login/login.module')
                    .then(mod => mod.LoginModule)
            },
            {
                path: 'registration',
                canActivate: [NoAuthGuard],
                loadChildren: () => import('./registration/registration.module')
                    .then(mod => mod.RegistrationModule)
            },
            {
                path: 'quote-request',
                loadChildren: () => import('./quote-request/quote-request.module')
                    .then(mod => mod.QuoteRequestModule)
            },
            {
                path: 'contact-us',
                loadChildren: () => import('./contact-us/contact-us.module')
                    .then(mod => mod.ContactUsModule)
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
                path: 'about-us',
                loadChildren: () => import('./about-us/about-us.module')
                    .then(mod => mod.AboutUsModule)
            },
            {
                path: 'terms-and-conditions',
                loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module')
                    .then(mod => mod.TermsAndConditionsModule)
            },
            {
                path: 'privacy-policy',
                loadChildren: () => import('./privacy-policy/privacy-policy.module')
                    .then(mod => mod.PrivacyPolicyModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('./forgot-password/forgot-password.module')
                    .then(mod => mod.ForgotPasswordModule)
            },
            {
                path: 'plans',
                loadChildren: () => import('./plans/plans.module')
                    .then(mod => mod.PlansModule)
            },
            {
                path: 'subbidding-plans',
                loadChildren: () => import('./subbidding-plans/subbidding-plans.module')
                    .then(mod => mod.SubbiddingPlansModule)
            }
            ,
            {
                path: 'subbidding-plans/:token',
                loadChildren: () => import('./subbidding-plans/subbidding-plans.module')
                    .then(mod => mod.SubbiddingPlansModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('./cart/cart.module')
                    .then(mod => mod.CartModule)
            },
            {
                path: 'sample-projects',
                loadChildren: () => import('./sample-project/sample-project.module')
                    .then(mod => mod.SampleProjectModule)
            },
            {
                path: 'project-details/:id',
                loadChildren: () => import('./project/project.module')
                    .then(mod => mod.ProjectModule)
            },
            {
                path: 'reset-password/:code',
                loadChildren: () =>
                    import('./reset-password/reset-password.module').then(
                        mod => mod.ResetPasswordModule
                    )
            },
            {
                path: 'payment-process/:message/:cartId',
                loadChildren: () =>
                    import('./payment-process/payment-process.module').then(
                        mod => mod.PaymentProcessModule
                    )
            },
            {
                path: 'payment-process/cancelled',
                loadChildren: () =>
                    import('./payment-process/cancel-payment/cancel-payment.module').then(
                        mod => mod.CancelPaymentModule
                    )
            },
            {
                path: 'subbidding-payment-process/:message',
                loadChildren: () =>
                    import('./subbidding-payment-process/subbidding-payment-process.module').then(
                        mod => mod.SubbiddingPaymentProcessModule
                    )
            },
            {
                path: 'set-password/:code',
                loadChildren: () =>
                    import('./set-password/set-password.module').then(
                        mod => mod.SetPasswordModule
                    )
            },
            {
                path: 'verify-email/:code',
                loadChildren: () => import('./verify-email/verify-email.module')
                    .then(mod => mod.VerifyEmailModule)
            },
            {
                path: 'social-login/:code',
                loadChildren: () => import('./social-login/social-login.module')
                    .then(mod => mod.SocialLoginModule)
            },

            {
                path: 'search',
                loadChildren: () => import('./search/search.module')
                    .then(mod => mod.SearchModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                data: { message: 'From Website' }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebsiteRoutes { }
