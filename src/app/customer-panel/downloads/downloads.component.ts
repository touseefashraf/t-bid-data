import { ConstantsService } from 'src/app/services/constants.service';
import { Component, OnInit } from '@angular/core'
import { DataService } from './data.service'
import * as moment from 'moment'
@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {
    fetching = true
    downloadList: any = []
    moment = moment
    percentage: any = 0
    dateFormat = this.cs.DATE_TIME_FORMAT.DATE
    subscriptionStatus = false
    constructor(
        public ds: DataService,
        public cs: ConstantsService
    ) {
        this.ds.getDownloadedDocuments().subscribe((resp: any) => {
            if (resp.success == true) {
                this.downloadList = resp.data
                if (this.downloadList.hasOwnProperty('download_used')) {
                    this.percentage = (this.downloadList.download_used / this.downloadList.total_downloads) * 100
                    this.subscriptionStatus = true
                }
                this.percentage = Math.trunc(this.percentage)
                this.fetching = false
            }
        })
    }

    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(file.project_id, 'qto', documentId).subscribe((resp: any) => {
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

    ngOnInit() {
    }

}
