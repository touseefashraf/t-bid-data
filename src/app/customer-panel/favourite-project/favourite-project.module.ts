import { RouterModule } from '@angular/router';
import { CustomerSharedModule } from './../customer-shared/customer-shared.module';
import { SharedModule } from './../../website/shared/shared.module';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FavouriteProjectComponent } from './favourite-project.component'
import { DataService } from './data.service'


@NgModule({
    imports: [
        SharedModule,
        CustomerSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: FavouriteProjectComponent
            }
        ])
    ],
    declarations: [FavouriteProjectComponent],
    providers: [DataService]
})
export class FavouriteProjectModule { }
