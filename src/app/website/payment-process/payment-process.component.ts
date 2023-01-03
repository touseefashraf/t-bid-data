import { IAlertService } from './../../libs/ialert/ialerts.service';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-payment-process',
    templateUrl: './payment-process.component.html',
    styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {
    message: any
    downloadFile = []
    dataStatus = 'featch'
    downloading = false
    cartId: any
    alreadyDownloaded = false
    docData = []
    loginLoading = false;
    constructor(
        private ds: DataService,
        public route: ActivatedRoute,
        public router: Router,
        public api: ApiService,
        public alert: IAlertService
    ) {
        this.message = this.route.snapshot.paramMap.get('message')
        this.cartId = this.route.snapshot.paramMap.get('cartId')
        if (this.message == 'success') {
            /*this.ds.downloadFolder(this.cartId).subscribe((resp: any) => {
                if (resp.status == 202) {
                    this.alreadyDownloaded = true
                    this.downloading = true
                    this.alert.error('You have already downloaded files.')

                    return false
                }
                const binaryData = []
                binaryData.push(resp.body)
                const downloadLink = document.createElement('a')
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.body.type }))
                downloadLink.setAttribute('download', 'document')
                document.body.appendChild(downloadLink)
                downloadLink.click()
                this.downloading = true
                localStorage.removeItem('cart')
                this.api.cartItmes.next(0)
                this.api.cartData = null
            })*/
        } else {
            this.router.navigate(['/cart'])
        }

        const param = {
            cart_id: this.cartId
        }
        this.ds.downloadFolder(param).subscribe((resp: any) => {
            if (resp.success === true) {
                Object.keys(resp.data).forEach((projectId) => {
                    this.docData.push({
                        project_name: resp.data[projectId].project_name,
                        files: resp.data[projectId].files
                    })
                })
            }
            if (resp.success==false) {
                this.alreadyDownloaded=true

            }
            this.dataStatus = 'done'
        })
    }

    downloadDocument(uuDocId, selectedIndex,fileName) {
        this.downloading = true
        const param = {
            uuid: uuDocId
        }
        this.ds.downloadDocument(param).subscribe((resp: any) => {
            const binaryData = []
            binaryData.push(resp)
            const downloadLink = document.createElement('a')
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: resp.type }))

            downloadLink.setAttribute('download', fileName)
            this.downloading = false
            document.body.appendChild(downloadLink)
            this.docData.splice(selectedIndex, 1)
            if (this.docData.length < 1) {

                if (localStorage.getItem('cart')) {
                    localStorage.removeItem('cart')
                    this.api.cartItmes.next(0)
                    this.api.cartData = null
                }

            }
            downloadLink.click()

        })
    }
    ngOnInit() {
    }

}
