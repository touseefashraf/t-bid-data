import { UIHelpers } from '../../helpers/ui-helpers';
import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DataService } from './data.service'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
    dataStatus = 'fetching'
    name: any = ''
    registrationDate = ''
    userType = ''
    data = []
    userForm: FormGroup
    selectedIndex: any
    modalRef: BsModalRef
    selectedId: any
    page = 1
    pagination: any
    nameOrder = ''
    results: any
    loaderOptions = {
        rows: 5,
        cols: 5,
        colSpans: {
            0: 1,
        }
    }
    waiting = {
        customerStatus: [],
        loading: false,
        search: false
    }
    constructor(
        private ds: DataService,
        private fb: FormBuilder,
        private ui: UIHelpers,
        private alert: IAlertService,
        private ms: BsModalService,
        private elem: ElementRef,
        public router: Router,
        private route: ActivatedRoute,


    ) {
        this.route.queryParams.subscribe(params => {

            if (params.page) {
                this.page = params.page
            }
            if (params.name) {
                this.name = params.name
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
            name: this.name,
        }
        this.router.navigate(['/admin/customers'], { queryParams: filtersParam, replaceUrl: true })
    }

    ngOnInit() {

    }
    search(): void {
        this.waiting.search = true
        const params = {
            page: this.page,
            name: this.name,
        }
        this.ds.getList(params).subscribe((resp: any) => {
            this.waiting.search = false
            if (resp.success === true) {
                this.data = resp.data.data
                this.data.forEach(d => {
                    this.waiting.customerStatus.push(false)
                })
                this.pagination = resp.data
                this.dataStatus = 'done'
                this.router.navigate(['/admin/customers'], { queryParams: params, replaceUrl: true })
            }
        })

    }
    // redirectToUserProfileEdit(u: any) {
    //     const params: any = {
    //         id: u.id
    //     }
    //     this.router.navigate(['/admin/profile-' + u.user_type], { queryParams: params, replaceUrl: true })
    // }


    confirmingModal(template: TemplateRef<any>, id: any, i: any) {
        this.selectedId = id
        this.selectedIndex = i
        this.modalRef = this.ms.show(template, { class: 'modal-sm admin-panel' })
    }


    activeUser(id, index) {
        this.waiting.customerStatus[index] = true
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.activeUser(param).subscribe((resp: any) => {
            this.waiting.customerStatus[index] = false
            if (resp.success === true) {
                this.alert.success('user active successfully')
                this.data[this.selectedIndex].status = 'active'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }

    inactiveUser(id, index) {
        this.waiting.customerStatus[index] = true
        this.selectedId = id
        this.selectedIndex = index
        const param = { id: this.selectedId }
        this.ds.inactiveUser(param).subscribe((resp: any) => {
            this.waiting.customerStatus[index] = false
            if (resp.success === true) {
                this.alert.success('user deactive successfully')
                this.data[this.selectedIndex].status = 'inactive'
            } else {
                this.alert.error('Some error!!')
            }

        })
    }

    delete() {
        this.waiting.loading = true
        const param = { id: this.selectedId }
        this.ds.delete(param).subscribe((resp: any) => {
            this.waiting.loading = false
            if (resp.success === true) {
                this.alert.success('Customer deleted successfully')
                this.data.splice(this.selectedIndex, 1)
                this.modalRef.hide()
            } else {
                this.alert.error('Some error!!')
                this.modalRef.hide()
            }

        })
    }


}
