import { Component, OnInit, TemplateRef } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
    selector: 'app-quote-requests',
    templateUrl: './quote-requests.component.html',
    styleUrls: ['./quote-requests.component.css']
})
export class QuoteRequestsComponent implements OnInit {
    dataStatus = 'fetching'
    quoteRequestList = []
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    page = 1
    pagination: any
    waiting = {
        delete: false
    }
    loaderOptions = {
        rows: 5,
        cols: 7,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        private ds: DataService,
        private alert: IAlertService,
        private route: ActivatedRoute,
        private ms: BsModalService,
        public router: Router,
    ) {
        this.route.queryParams.subscribe(params => {
            if (params.page) {
                this.page = params.page
            }
            if (params) {
                this.search()
            }
        })
    }

    setPagination(page: number) {
        let filtersParam: any = {}

        filtersParam = {
            page,
        }
        this.router.navigate(['/admin/quote-requests'], { queryParams: filtersParam, replaceUrl: true })
    }

    search(): void {
        const params = {
            page: this.page,
        }
        this.ds.getList(params).subscribe((resp: any) => {
            if (resp.success === true) {
                this.quoteRequestList = resp.data.data
                this.pagination = resp.data
                this.dataStatus = 'done'
                this.router.navigate(['/admin/quote-requests'], { queryParams: params, replaceUrl: true })
            }
        })

    }

    ngOnInit() {
    }

    delete() {
        this.waiting.delete = true
        const params = {
            id: this.selectedId
        }
        this.ds.delete(params)
            .subscribe((resp: any) => {
                this.waiting.delete = false
                if (resp.success === false) {
                    this.alert.error(resp.errors.general)
                    this.modalRef.hide()

                    return false
                } else {
                    const deletingIndex = this.quoteRequestList.findIndex((d: any) => {
                        return d.id === this.selectedId
                    })
                    this.quoteRequestList.splice(deletingIndex, 1)
                    this.modalRef.hide()
                    this.alert.success('Quote Request deleted successfully!!')
                }
            })
    }
    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }

    cancelRegionButton(f: any) {
        f.resetForm()
        this.modalRef.hide()
    }

}
