import { SearchLoaderComponent } from './search-loader/search-loader.component';
import { SharedModule } from 'src/app/website/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgModule, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchComponent } from './search.component'
import { DataService } from './data.service'
import { AgmCoreModule } from '@agm/core'
import { apis } from 'src/environments/environment'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { ModalModule } from 'ngx-bootstrap/modal'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: apis.googleApiKey,
            libraries: ['places']
        }),
        RouterModule.forChild([
            {
                path: '',
                component: SearchComponent
            }
        ])
    ],
    declarations: [SearchComponent,SearchLoaderComponent],
    providers: [DataService]
})
export class SearchModule { }
