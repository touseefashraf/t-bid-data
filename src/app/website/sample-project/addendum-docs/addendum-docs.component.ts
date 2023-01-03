import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-addendum-docs',
    templateUrl: './addendum-docs.component.html',
    styleUrls: ['./addendum-docs.component.css']
})
export class AddendumDocsComponent implements OnInit, OnDestroy {

    data = []
    doc: any
    moment = moment
    dateFormat: any
    filePath: any = ''
    constructor(
        public ds: DataService,
        private cs: ConstantsService,
        private _sanitizer: DomSanitizer,
    ) {
        this.dateFormat = this.cs.DATE_TIME_FORMAT.CHAR_DATE
        this.ds.getSampleProject().subscribe((resp: any) => {
            this.data = resp.data.project.documents
            this.ds.dataStatus = 'done'
        })

    }
    ngOnDestroy() {
        this.ds.dataStatus = 'fetching'
    }
    ngOnInit() {
    }

    getDoc(id, fileType, pId) {
        this.ds.downloadPDF(pId, fileType, id).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
        });
    }
    viewDoc(id, fileType, pId) {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.ds.viewPDF(pId, fileType, id));
    }
    downloadFolder() {

        this.ds.downloadFolder(this.ds.pId, 'addendum').subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))
            downloadLink.setAttribute('download', 'document')
            document.body.appendChild(downloadLink)
            downloadLink.click()
        })
    }

    downloadDocument(documentId: number, file: any) {
        this.ds.downloadDocument(file.project_id, 'addendum', documentId).subscribe((resp: any) => {
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


}
