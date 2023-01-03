import { ConstantsService } from '../../services/constants.service';
import { NoDataComponent } from './no-data/no-data.component'
import { LoaderComponent } from './loader/loader.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { QtoSidebarComponent } from './qto-sidebar/qto-sidebar.component'
import { IAlertsModule } from 'src/app/libs/ialert/ialerts.module';


@NgModule({
    imports: [
        IAlertsModule,
        BsDropdownModule.forRoot(),
        CommonModule, FormsModule, RouterModule, NgScrollbarModule,

    ],
    declarations: [
        QtoSidebarComponent,
        LoaderComponent,
        NoDataComponent,
    ],
    providers: [
        {
           provide: NG_SCROLLBAR_OPTIONS,
           useValue: {
                track: 'all',
                appearance: 'compact',
                visibility: 'always',
                autoUpdate: true
           }
        }
    ],
    exports: [
        QtoSidebarComponent, LoaderComponent, NoDataComponent,
        IAlertsModule, BsDropdownModule,
        CommonModule, FormsModule, RouterModule, NgScrollbarModule
    ]
})
export class QtoSharedModule { }
