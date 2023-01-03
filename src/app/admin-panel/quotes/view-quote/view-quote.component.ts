import { ConstantsService } from 'src/app/services/constants.service';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DataService } from './data.service'
import * as moment from 'moment'
@Component({
    selector: 'app-view-quote',
    templateUrl: './view-quote.component.html',
    styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {
    quoteId: any = -1
    quoteDetails: any
    fetching = true
    moment = moment
    dateFormat = this.cs.DATE_TIME_FORMAT.DATE
    constructor(
        private route: ActivatedRoute,
        private ds: DataService,
        public cs:ConstantsService
    ) {
        this.quoteId = this.route.snapshot.paramMap.get('id')
        const param = {
            quote_id: this.quoteId
        }
        this.ds.getQuoteDetails(param).subscribe((resp: any) => {
            if (resp.success == true) {
                this.quoteDetails = resp.data
                this.fetching = false
            }
        })
    }

    getDoc(quoteId, fileType, docId) {
        this.ds.downloadPDF(quoteId, fileType, docId).subscribe(res => {
            const fileURL = URL.createObjectURL(res)
            window.open(fileURL, '_blank')
        })

    }
    getData(docType: string) {
        const index = this.quoteDetails.documents.findIndex(d => d.document_type == docType)
        if (index > -1) {
            return false
        } else {
            return true
        }
    }
    ngOnInit() {
    }

}
