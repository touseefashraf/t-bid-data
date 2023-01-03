import { DataService } from '../data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { ConstantsService } from 'src/app/services/constants.service'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-specs',
    templateUrl: './specs.component.html',
    styleUrls: ['./specs.component.css']
})
export class SpecsComponent implements OnInit, OnDestroy {
    data = []
    filePath: any = ''
    doc: any
    moment = moment
    dateFormat: any
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
    ngOnDestroy() {
        this.ds.dataStatus = 'fetching'
    }
    downloadFolder() {
        this.ds.downloadFolder(this.ds.pId, 'qto').subscribe((resp: any) => {
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
        this.ds.downloadDocument(file.project_id, 'spec', documentId).subscribe((resp: any) => {
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
