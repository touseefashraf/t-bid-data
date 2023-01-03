import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { UIHelpers } from 'src/app/helpers/ui-helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from './data.service'
import { Component, OnInit } from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-subbidding-plans',
  templateUrl: './subbidding-plans.component.html',
  styleUrls: ['./subbidding-plans.component.css']
})
export class SubbiddingPlansComponent implements OnInit {

    dataStatus = 'fetching'
    bankList = []
    subbiddingPlans=[]
    selectedIndex = -1
    plansForm: FormGroup
    modalRef: BsModalRef
    loginLoading = false
    loaderOptions = {
        rows: 3,
        cols: 5,
        colSpans: {
            0: 1,
        }
    }

    constructor(
        public ds: DataService,
        private fb: FormBuilder,
        public ui: UIHelpers ,
        private alert: IAlertService ,
        public ms: BsModalService,
        public route: ActivatedRoute,
        private router: Router
    ) {

        const list = this.ds.list()
        list.subscribe((resp: any) => {
            if (resp.success === true) {
                this.subbiddingPlans = resp.data
                this.dataStatus = 'done'
            }
        })

        // Set Leads Form fields
        this.plansForm = this.fb.group({
            id: new FormControl(null),
            title: new FormControl(null, [Validators.required]),
            price: new FormControl(null, [Validators.required]),
            description : new FormControl(null, [Validators.required])
        })


    }
    get g() {
        return this.plansForm.controls
    }
    ngOnInit() {
    }

    openModal(modal, index) {

        if (index > -1) {
            this.plansForm.controls.id.setValue(this.subbiddingPlans[index].id)
            this.plansForm.patchValue(this.subbiddingPlans[index])
        }

        this.selectedIndex = index

        this.modalRef = this.ms.show(
            modal,
            {
                class: 'modal-md modal-dialog-centered admin-panel',
                backdrop: 'static',
                ignoreBackdropClick: true,
                keyboard: false
            }
        )
    }

    save(f: any) {
        this.loginLoading = true
        if (this.plansForm.status === 'INVALID') {
            this.alert.error('Please fill-in valid data in all fields & try again.')
            this.loginLoading = false
            return false
        }
        let saveUpdate = this.ds.add(this.plansForm.value)

        if (this.plansForm.value.id !== null) {
            saveUpdate = this.ds.update(this.plansForm.value)
        }
        saveUpdate.subscribe((resp: any) => {

            this.loginLoading = false

            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                return false
            } else {
                if (this.selectedIndex > -1) {
                    this.alert.success('Changes done successfully!!')
                    this.subbiddingPlans[this.selectedIndex] = this.plansForm.value
                    this.selectedIndex = -1

                } else {
                    this.alert.success('Lead added successfully!!')
                    this.subbiddingPlans.push(this.plansForm.value)
                }
                this.modalRef.hide()
                f.resetForm()
            }
        })

    }

    deleteEntry(f: any) {
        this.loginLoading = true
        const params = {
            id: this.subbiddingPlans[this.selectedIndex].id
        }
        const deleteEntry = this.ds.delete(params)
        deleteEntry.subscribe((resp: any) => {
            this.loginLoading = false
            if (resp.success === false) {
                this.alert.error(resp.errors.general)
                this.loginLoading = false
                return false
            } else {

                this.subbiddingPlans.splice(this.selectedIndex, 1)
                this.alert.success('Lead Entry Deleted successfully!!')
            }
            this.modalRef.hide()
        })
    }


    cancelButton(f: any) {
        if (f) {
            f.resetForm()
        }
        this.modalRef.hide()
    }

}
