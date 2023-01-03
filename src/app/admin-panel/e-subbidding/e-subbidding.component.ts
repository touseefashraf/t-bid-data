import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { Component, OnInit } from '@angular/core'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { DataService } from './data.service'
import { ConstantsService } from 'src/app/services/constants.service'

@Component({
    selector: 'app-e-subbidding',
    templateUrl: './e-subbidding.component.html',
    styleUrls: ['./e-subbidding.component.css']
})
export class ESubbiddingComponent implements OnInit {
    dataToSend: any = {
        id: '',
        route: 'e-subbidding',
        content: ''
    }
    editorConfig: any = ConstantsService.EDITOR_CONFIG
    waiting = {
        save: false
    }
    constructor(
        private ds: DataService,
        private alert: IAlertService
    ) { }

    ngOnInit() {
        const params = {
            route: this.dataToSend.route
        }
        this.ds.getContent(params).subscribe((resp: any) => {
            if (resp.success === true) {
                if (resp.data !== null) {
                    this.dataToSend.id = resp.data.id
                    this.dataToSend.content = resp.data.content
                }
            }
        })
    }

    saveContent() {
        this.waiting.save = true
        if (this.dataToSend.content === '') {
            this.alert.error('Content cant be empty')
            this.waiting.save = false

            return false
        }
        this.ds.saveContent(this.dataToSend).subscribe((resp: any) => {
            this.waiting.save = false
            if (resp.success === true) {
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
