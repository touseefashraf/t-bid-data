import { DataService } from './data.service'
import { SharedModule } from './../../website/shared/shared.module'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WhyUsComponent } from './why-us.component'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { QuillModule } from 'ngx-quill'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        AngularEditorModule,
        QuillModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: WhyUsComponent
            }])
    ],
    declarations: [WhyUsComponent],
    providers: [DataService]
})
export class WhyUsModule { }
