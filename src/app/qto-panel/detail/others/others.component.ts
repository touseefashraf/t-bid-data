import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
import { DataService } from '../data.service'

@Component({
    selector: 'app-others',
    templateUrl: './others.component.html',
    styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
    @Input()
    others: any
    @Input()
    projectId: any
    moment = moment
    dateFormat: any
    constructor(
        public cs: ConstantsService,
        public ds: DataService
    ) {
        this.dateFormat = cs.DATE_TIME_FORMAT.DOC_DATE

    }
    ngOnInit() {
    }
    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(this.projectId, 'other', documentId).subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            if (file.name) {
                downloadLink.setAttribute('download', file.name.split(".")[0])
            } else {
                downloadLink.setAttribute('download', 'document')
            }
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }
    downloadFolder(){
        this.ds.downloadFolder(this.projectId, 'other').subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            downloadLink.setAttribute('download', 'document')
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }
}
