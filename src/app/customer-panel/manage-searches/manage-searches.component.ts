import { ConstantsService } from './../../services/constants.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from './data.service'
import * as moment from 'moment'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { UIHelpers } from 'src/app/helpers/ui-helpers';
@Component({
    selector: 'app-manage-searches',
    templateUrl: './manage-searches.component.html',
    styleUrls: ['./manage-searches.component.css']
})
export class ManageSearchesComponent implements OnInit {
    savedSearchesList: any = []
    moment = moment
    dateFormat = this.cs.DATE_TIME_FORMAT.CHAR_DATE
    saveSearchForm: FormGroup
    modalRef: BsModalRef
    selectedId: any
    updateLoading = false
    selectedIndex: any
    fetching = true
    constructor(
        public ds: DataService,
        public api: ApiService,
        public cs: ConstantsService,
        public alert: IAlertService,
        private ms: BsModalService,
        private fb: FormBuilder,
        public ui: UIHelpers
    ) {
        this.ds.savedProjectSearches().subscribe((resp: any) => {
            if (resp.success == true) {
                this.savedSearchesList = resp.data
                this.fetching = false
            }
        })
        this.saveSearchForm = this.fb.group({
            id: new FormControl(),
            title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            keyword: new FormControl(null, [Validators.minLength(5), Validators.maxLength(100)]),
            location: new FormControl(null, [Validators.minLength(5), Validators.maxLength(150)]),
            project_status: new FormControl('open'),
            date_from: new FormControl(null, []),
            date_to: new FormControl(null, []),
            price_from: new FormControl(null, [Validators.min(0)]),
            price_to: new FormControl(null, []),
            lat: new FormControl(null),
            lng: new FormControl(null),
        })
        this.setValidator()
    }

    ngOnInit() {
    }

    get g() {
        return this.saveSearchForm.controls
    }

    openModalSaveSearches(saveSearchTemplate: TemplateRef<any>, index: any) {
        this.selectedIndex = index
        if (index > -1) {
            this.saveSearchForm.patchValue(this.savedSearchesList[index])
            if (this.savedSearchesList[index].date_from) {
                this.saveSearchForm.controls.date_from.setValue(new Date(this.savedSearchesList[index].date_from))
            }
            if (this.savedSearchesList[index].date_to) {
                this.saveSearchForm.controls.date_to.setValue(new Date(this.savedSearchesList[index].date_to))
            }
        }
        this.modalRef = this.ms.show(
            saveSearchTemplate,
            {
                class: 'modal-lg website',
                keyboard: false,
                ignoreBackdropClick: true
            }
        )

    }

    setValidator() {
        this.saveSearchForm.get('price_from').valueChanges.subscribe((newVal: any) => {
            this.saveSearchForm.get('price_from').setValidators([Validators.max(this.saveSearchForm.get('price_to').value), Validators.min(0)])
            this.saveSearchForm.get('price_to').setValidators(Validators.min(newVal))
            this.saveSearchForm.get('price_to').markAsTouched()
            this.saveSearchForm.get('price_to').updateValueAndValidity({ emitEvent: true })
        })
        this.saveSearchForm.get('price_to').valueChanges.subscribe((newVal: any) => {
            this.saveSearchForm.get('price_to').setValidators(Validators.min(this.saveSearchForm.get('price_from').value))
            this.saveSearchForm.get('price_from').setValidators(Validators.max(newVal))
            this.saveSearchForm.get('price_from').markAsTouched()
            this.saveSearchForm.get('price_from').updateValueAndValidity({ emitEvent: false })
        })
    }
    saveSearchData(data: any, f: any) {
        if (data.status == 'INVALID') {
            this.alert.error('Please Fill valid data in all fields and try again.')

            return false
        }
        if (moment(data.value.date_from).diff(moment(data.value.date_to)) > 0) {
            this.alert.error('Minimum Date cant be greater then Maximum Date')

            return false
        }
        if (data.value.date_from) {
            data.value.date_from = moment(data.value.date_from).format('YYYY-MM-DD')
        }
        if (data.value.date_to) {
            data.value.date_to = moment(data.value.date_to).format('YYYY-MM-DD')
        }
        let saveMethod = this.ds.saveSearches(data.value)
        if (this.selectedIndex > -1) {
            saveMethod = this.ds.updateSearches(data.value)
        }
        saveMethod.subscribe((resp: any) => {
            if (resp.success == true) {
                if (this.selectedIndex > -1) {
                    this.savedSearchesList[this.selectedIndex] = resp.data[0]
                    this.alert.success('Data updated successfully')
                } else {
                    this.alert.success('Your search data saved successfully')
                    this.savedSearchesList.push(resp.data)
                }

            } else {
                this.alert.error(resp.errors.general)
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }
    deleteConfirming(deleteConfirmingTemplate: TemplateRef<any>, index: any) {
        this.selectedIndex = index
        this.modalRef = this.ms.show(
            deleteConfirmingTemplate,
            {
                class: 'modal-sm website',
                keyboard: false,
                ignoreBackdropClick: true
            }
        )
    }
    delete() {
        this.updateLoading = true
        const params = {
            id: this.savedSearchesList[this.selectedIndex].id
        }
        this.ds.deleteSearches(params).subscribe((resp: any) => {
            if (resp.success == true) {
                this.alert.success('Data Deleted Successfully')
                this.savedSearchesList.splice(this.selectedIndex, 1)
                this.updateLoading = false
            } else {
                this.alert.error(resp.errors.general)
                this.updateLoading = false
            }
            this.modalRef.hide()
        })
    }
    cancel(f) {
        this.modalRef.hide()
        f.resetForm()
    }

}
