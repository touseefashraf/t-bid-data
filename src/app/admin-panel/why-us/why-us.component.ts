import { ConstantsService } from 'src/app/services/constants.service';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { Component, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { DataService } from './data.service'

@Component({
    selector: 'app-why-us',
    templateUrl: './why-us.component.html',
    styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {
    topContent = ''
    bottomContent = ''
    dataToSend: any = {
        id: '',
        route: 'why-us',
        content: ''
    }
    editorConfig: any = ConstantsService.EDITOR_CONFIG
    saveLoading = false
    constructor(
        private ds: DataService,
        private alert: IAlertService
    ) {
    }

    ngOnInit() {
        const params = {
            route: this.dataToSend.route
        }
        this.ds.getContent(params).subscribe((resp: any) => {
            if (resp.success == true) {
                if (resp.data !== null) {
                    this.dataToSend.id = resp.data.id
                    const parsedValue = JSON.parse(resp.data.content)
                    if (parsedValue.top_content) {
                        this.topContent = parsedValue.top_content
                    }
                    if (parsedValue.bottom_content) {
                        this.bottomContent = parsedValue.bottom_content
                    }
                }
            }
        })
    }

    saveContent() {
        this.saveLoading = true
        const content = {
            top_content: this.topContent,
            bottom_content: this.bottomContent
        }
        this.dataToSend.content = JSON.stringify(content)
        if (this.dataToSend.content == '') {
            this.alert.error('Content cant be empty')
            this.saveLoading = false

            return false
        }
        this.ds.saveContent(this.dataToSend).subscribe((resp: any) => {
            this.saveLoading = false
            if (resp.success == true) {
                if (this.dataToSend.id !== '') {
                    this.alert.success('Content Updated Successfully')
                } else {
                    this.alert.success('content saved successfully')
                    this.dataToSend.id = resp.data.id
                }
            } else {
                this.alert.error(resp.errors.general)
            }
        })
    }
}
