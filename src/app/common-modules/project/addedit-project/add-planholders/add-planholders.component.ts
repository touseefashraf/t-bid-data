import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { IAlertService } from './../../../../libs/ialert/ialerts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from './../../../../services/api.service'
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { DataService } from '../data.service'

@Component({
    selector: 'app-add-planholders',
    templateUrl: './add-planholders.component.html',
    styleUrls: ['./add-planholders.component.css']
})
export class AddPlanholdersComponent implements OnInit {
    @ViewChild('autocomplete') auto;
    modalRef: BsModalRef
    deletePop: any
    selectedIndex = -1
    checkValue = true
    isAwarded: any = false
    isLoading = false
    projectPlanHolers = []
    planholdersSearchData = []
    loadingPlanholders = true
    apiData = {
        project_id: this.dataService.selectedId,
        bid_phase: this.dataService.bidPhase,
        plan_holder_data: [],
        awarded: 0
    }

    constructor(
        public api: ApiService,
        public dataService: DataService,
        public ms: BsModalService,
        public alert: IAlertService,
        public pipe: FilterPipe
    ) { }

    ngOnInit() {
        this.onChangeSearch('')

        this.dataService.projectPlanHoldersNew({
            project_id: this.dataService.projectDetails.id
        }).subscribe((resp: any) => {
            this.projectPlanHolers = resp.data
            resp.data.forEach(d => {
                if (d.awarded == 1) {
                    this.isAwarded = true
                    this.apiData.awarded = d.plan_holder_id
                }
            })
            this.loadingPlanholders = false
        })
    }

    awardProject(data: any, index: number) {
        this.projectPlanHolers.forEach(d => {
            if (d.plan_holder_id == data.plan_holder_id) {
                d.awarded = 1
                this.apiData.awarded = d.plan_holder_id

            } else {
                d.awarded = 0
            }
        })
        this.isAwarded = true
    }

    removeRow() {
        if (this.projectPlanHolers[this.selectedIndex].awarded == 1) {
            this.isAwarded = false
        }
        this.projectPlanHolers.splice(this.selectedIndex, 1)
    }

    saveData() {
        this.isLoading = true
        if (this.dataService.bidPhase !== 'open' && this.projectPlanHolers.length == 0) {
            this.isLoading = false
            this.alert.error('Please Select Atleast one planholder')

            return false
        }

        this.projectPlanHolers.forEach(d => {
            if (this.dataService.bidPhase !== 'open' && (d.price == null))
                this.checkValue = false

            return false
        })
        if (this.dataService.bidPhase !== 'open' && this.checkValue == false) {
            this.alert.error('Price cant be empty')
            this.checkValue = true
            this.isLoading = false

            return false
        }
        if (this.dataService.bidPhase == 'awarded' && !this.isAwarded) {
            this.alert.error('Your bid phase is awarded. Awarded plan holder is required')
            this.isLoading = false

            return false
        }
        this.apiData.bid_phase = this.dataService.bidPhase
        this.apiData.plan_holder_data = this.formatPlanholdersToSend()
        if (this.dataService.bidPhase !== 'awarded') {
            delete this.apiData.awarded
        }
        this.dataService.savePlanHolders(this.apiData).subscribe((resp: any) => {
            this.isLoading = false
            if (resp.success == true) {
                this.alert.success('Plan holders Saved successfully')
                const navigateObj = {
                    id: this.dataService.selectedId,
                    step: 'spec'
                }
                this.dataService.navigateWindow(navigateObj)
            } else {
                this.alert.error(resp.errors.general)
            }
        })
    }

    onChangeSearch(keyword: string) {
        this.dataService.searchablePlanholders(keyword)
        .subscribe((resp: any) => {
            this.planholdersSearchData = this.excludeExisting(resp.data)

        }, (error) => {
        })
    }

    selectPlanholder(item: any) {
        this.projectPlanHolers.push({
            plan_holder_id: item.id,
            awarded: 0,
            price: 0,
            plan_holder: item
        })

        const index = this.planholdersSearchData.findIndex( (d: any) => {
            return d.id = item.id
        })
        this.planholdersSearchData.splice(index, 1)
        this.auto.clear()
    }

    formatPlanholdersToSend() {
        const dataToSend = []
        this.projectPlanHolers.forEach((d: any) => {
            dataToSend.push({
                id: +d.plan_holder_id,
                price: d.price
            })
        })
        return dataToSend
    }

    excludeExisting(data: Array<any>) {
        return data.filter((d: any) => {
            const index = this.projectPlanHolers.findIndex((p: any) => {
                return d.id == p.plan_holder_id
            })
            return index == -1
        })
    }
    onFocused(e: any) { }

    onClear() {
    }
}
