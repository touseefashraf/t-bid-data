import { UIHelpers } from 'src/app/helpers/ui-helpers'
import { IAlertService } from 'src/app/libs/ialert/ialerts.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { DataService } from './data.service'
import { ApiService } from 'src/app/services/api.service'
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MapsAPILoader } from '@agm/core'
import * as moment from 'moment'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { invalid } from '@angular/compiler/src/render3/view/util'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @ViewChild('searchAddress', { static: false }) public searchAddressElementRef: ElementRef
    public searchControl: FormControl
    isAuthenticated = false
    isCustomer = false
    moment = moment
    addressLat = null
    addressLng = null
    projectList: any = []
    divisionList: any = []
    savedSerachList: any = []
    pagination: any
    showAdvance = false
    favProjectsList: any = []
    fetching = true
    saveSearchForm: FormGroup
    modalRef: BsModalRef
    filters: any = {
        title: this.api.searchKeyword,
        order_by: 'dateAsc',
        period_type: '',
        min_amount: '',
        max_amount: '',
        min_date: null,
        max_date: null,
        project_status: '',
        division_id: '',
        address: '',
        page: 1,
        country: '',
        qto_projects: ''
    }
    paramsToUpdate: any
    searchLoading = false
    waiting = {
        saveSearch: false
    }
    CurrentDate: any
    constructor(
        public api: ApiService,
        public ds: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        public alert: IAlertService,
        private ms: BsModalService,
        private fb: FormBuilder,
        public ui: UIHelpers
    ) {
        this.route.queryParams.subscribe((param: Params) => {
            if (param.title) {
                this.filters.title = param.title
            }
            if (param.order_by) {
                this.filters.order_by = param.order_by
            }
            if (param.min_amount) {
                this.filters.min_amount = param.min_amount
            }
            if (param.max_amount) {
                this.filters.max_amount = param.max_amount
            }
            if (param.min_date) {
                this.filters.min_date = new Date(param.min_date)
            }
            if (param.max_date) {
                this.filters.max_date = new Date(param.max_date)
            }
            if (param.project_status) {
                this.filters.project_status = param.project_status
            }
            if (param.period_type) {
                if (param.period_type == 'na') {
                    this.filters.period_type = ''
                } else {
                    this.filters.period_type = param.period_type
                }

            }

            if (param.country) {
                this.filters.country = param.country
            }
            if (param.address) {
                this.filters.address = decodeURI(param.address)
            }
            if (param.qto_projects) {
                this.filters.qto_projects = param.qto_projects
            }
            if (param.country) {
                if (this.filters.country === 'USA') {
                    this.api.activeTab = 'usTenders'
                } else if (this.filters.country === 'Canada') {
                    this.api.activeTab = 'canadaTenders'
                } else {
                    this.api.activeTab = ''
                }
            }
            if (param.division_id) {
                this.filters.division_id = param.division_id
            }
            if (param.page) {
                this.filters.page = param.page
            }
            if (this.filters.project_status == 'bid_results' || this.filters.project_status == 'awarded') {
                this.filters.period_type = 'old'
                this.filters.order_by = 'dateDesc'
            }
            if (param.title) {
                this.filters.period_type = ''
                this.filters.order_by = 'dateDesc'
            }
            if(this.filters.period_type=='new') {
                this.filters.order_by = 'dateAsc'
            }
            if (param) {
                this.getList()

            } else {
                this.getList()
            }
        })
        this.ds.divisions().subscribe((resp: any) => {
            if (resp.success === true) {
                this.divisionList = resp.data
            }
        })
        // Check User Login
        api.userLoggedInObs.subscribe(m => {
            this.isAuthenticated = m
            if (this.isAuthenticated) {
                this.loginUpdates()
            }
        })
        // Get fav projects if Authenticated
        if (this.isAuthenticated && this.api.user.user_type === 'customer') {
            this.ds.favProjects().subscribe((resp: any) => {
                if (resp.success === true) {
                    this.favProjectsList = resp.data
                }
            })// Fav Projects Call

            this.ds.savedProjectSearches().subscribe((resp: any) => {
                if (resp.success === true) {
                    this.savedSerachList = resp.data
                }
            })// Saved Searches Call
        }
        this.saveSearchForm = this.fb.group({
            title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            keyword: new FormControl(null, [Validators.minLength(5), Validators.maxLength(100)]),
            location: new FormControl(null, [Validators.minLength(5), Validators.maxLength(150)]),
            project_status: new FormControl('open'),
            date_from: new FormControl(null),
            date_to: new FormControl(null),
            price_from: new FormControl(null, [Validators.min(0)]),
            price_to: new FormControl(null, []),
            lat: new FormControl(null),
            lng: new FormControl(null),
        })
        this.setValidator()
    }
    clearFilter() {
        // this.searchLoading = true
        this.filters.page = 1
        this.filters.order_by = 'dateAsc'
        this.filters.period_type = 'new'
        this.filters.min_amount = ''
        this.filters.max_amount = ''
        this.filters.min_date = null
        this.filters.max_date = null
        this.filters.project_status = ''
        this.filters.division_id = ''
        this.filters.address = ''
        this.filters.country = ''
        this.filters.qto_projects = ''
        this.filters.title = ''
        this.showAdvance = false
        this.getList()
    }
    filterApplied() {
        if (this.filters.title != '' || this.filters.qto_projects != '' || this.filters.country != '' || this.filters.address != '' || this.filters.division_id != '' || this.filters.project_status != '' || this.filters.max_date != null || this.filters.min_date != null || this.filters.max_amount != '' || this.filters.min_amount != '') {
            return true
        }
        else {
            return false
        }
    }

    setValidator() {
        this.saveSearchForm.get('price_from').valueChanges.subscribe((newVal: any) => {
            this.saveSearchForm.get('price_from').setValidators(Validators.max(this.saveSearchForm.get('price_to').value))
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
        this.waiting.saveSearch = true
        if (data.status === 'INVALID') {
            this.alert.error('Please Fill valid data in all fields and try again.')
            this.waiting.saveSearch = false

            return false
        }
        if (moment(data.value.date_from).diff(moment(data.value.date_to)) > 0) {
            this.alert.error('Minimum Date cant be greater then Maximum Date')
            this.waiting.saveSearch = false

            return false
        }
        // console.log(data.value);
        if (this.saveSearchForm.controls.date_from.value != null) {
            data.value.date_from = moment(this.saveSearchForm.controls.date_from.value).format('YYYY-MM-DD')

        } else {
            data.value.date_from = null
        }
        if (this.saveSearchForm.controls.date_to.value) {
            data.value.date_to = moment(this.saveSearchForm.controls.date_to.value).format('YYYY-MM-DD')

        }
        else {
            data.value.date_to = null
        }

        // data.value.date_from = moment(data.value.date_from).format('YYYY-MM-DD')
        // data.value.date_to = moment(data.value.date_to).format('YYYY-MM-DD')

        console.log(data.value.date_to);
        console.log(data.value.date_from);

        this.ds.saveSearches(data.value).subscribe((resp: any) => {
            this.waiting.saveSearch = false
            if (resp.success === true) {
                this.alert.success('Your search data saved successfully')
                this.savedSerachList.push(resp.data)

            } else {
                this.alert.error(resp.errors.general)
            }
            this.modalRef.hide()
            f.resetForm()
        })
    }
    cancel(f) {
        this.modalRef.hide()
        f.resetForm()
    }
    get g() {
        return this.saveSearchForm.controls
    }
    openModalSaveSearches(saveSearchTemplate: TemplateRef<any>) {
        this.modalRef = this.ms.show(
            saveSearchTemplate,
            {
                class: 'modal-lg website',
                keyboard: false,
                ignoreBackdropClick: true
            }
        )

    }
    getSerachData(value: any) {
        const index = this.savedSerachList.findIndex(d => d.id === +value)
        if (index > -1) {
            const data = this.savedSerachList[index]

            this.filters.title = data.keyword
            this.filters.min_amount = data.price_from
            this.filters.max_amount = data.price_to
            this.filters.project_status = data.project_status
            this.filters.address = data.location
            if (data.date_from !== '' && data.date_from !== null) {
                this.filters.min_date = new Date(data.date_from)
            }
            if (data.date_to !== '' && data.date_to !== null) {
                this.filters.max_date = new Date(data.date_to)
            }
            this.search()
        }
    }

    checkFavProject(d: any) {
        const index = this.favProjectsList.findIndex(fav => fav.project_id === d.id)
        if (index > -1) {
            return true
        } else {
            return false
        }
    }
    addRemoveFav(d: any) {
        const index = this.favProjectsList.findIndex(fav => fav.project_id === d.id)
        if (index > -1) {
            const params = {
                project_id: d.id
            }
            this.ds.removeFromFav(params).subscribe((resp: any) => {
                if (resp.success === true) {
                    this.alert.success('Project removed from Wishlist')
                    this.favProjectsList.splice(index, 1)
                } else {
                    this.alert.error(resp.errors.general)
                }
            })
        } else {
            const params = {
                project_id: d.id
            }
            this.ds.addToFav(params).subscribe((resp: any) => {
                if (resp.success === true) {
                    this.alert.success('Project added to Wishlist')
                    this.favProjectsList.push({ project_id: d.id })
                } else {
                    this.alert.error(resp.errors.general)
                }
            })
        }
    }
    ngOnInit() {
        this.autoComAddress()
        this.CurrentDate = moment().format('YYYY-MM-DD');
    }

    loginUpdates(): void {
        this.isCustomer = this.api.isCustomer()
    }

    autoComAddress(): void {
        this.searchControl = new FormControl()
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchAddressElementRef.nativeElement, {
                types: ['address']
            })
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace()
                if (place.geometry === undefined || place.geometry === null) {
                    return
                }
                this.addressLat = place.geometry.location.lat()
                this.addressLng = place.geometry.location.lng()
                this.filters.address = place.formatted_address

            })
        })
    }
    search() {
        if (this.filters.project_status == 'bid_results' || this.filters.project_status == 'awarded') {
            this.filters.period_type = 'old'
        } else {
            if (this.filters.title) {
                this.filters.period_type = ''
            } else {
                this.filters.period_type = 'new'
            }
        }
        if (this.filters.title) {
            this.filters.order_by = 'dateDesc'
        }
        this.searchLoading = true
        this.filters.page = 1
        this.showAdvance = false
        this.getList()
        this.filterApplied()
    }
    getList() {
        const paramsToSend: any = { ...this.filters }
        this.paramsToUpdate = { ...this.filters }
        if (paramsToSend.min_date !== null) {
            paramsToSend.min_date = moment(paramsToSend.min_date).format('YYYY-MM-DD 00:00:00')
            this.paramsToUpdate.min_date = moment(this.paramsToUpdate.min_date).format('YYYY-MM-DD')
        }
        if (paramsToSend.max_date !== null) {
            paramsToSend.max_date = moment(paramsToSend.max_date).format('YYYY-MM-DD 00:00:00')
            this.paramsToUpdate.max_date = moment(this.paramsToUpdate.max_date).format('YYYY-MM-DD')
        }
        if (this.paramsToUpdate.address !== '') {
            this.paramsToUpdate.address = encodeURI(this.paramsToUpdate.address)
        }
        if (moment(paramsToSend.min_date).diff(moment(paramsToSend.max_date)) > 0) {
            this.alert.error('Minimum Date cant be greater then Maximum Date')
            this.searchLoading = false

            return false
        }
        if ((this.filters.min_amount !== '' && this.filters.max_amount !== '') && (+this.filters.min_amount > +this.filters.max_amount)) {
            this.alert.error('Min amount cant be greater then Max Amount')
            this.searchLoading = false

            return false
        }
        if (this.filters.page === 1) {
            this.projectList = []
            this.fetching = true
        }
        this.ds.search(paramsToSend).subscribe((resp: any) => {
            this.searchLoading = false
            if (resp.success === true) {
                this.projectList = resp.data.data
                this.pagination = resp.data
                this.fetching = false
                this.paramsUpdateSettings()
                this.router.navigate(['/search'], { queryParams: this.paramsToUpdate, replaceUrl: false })
            }
        })
    }

    setPagination(page: number) {
        this.paramsToUpdate = { ...this.filters }
        if (this.paramsToUpdate.min_date !== null) {
            this.paramsToUpdate.min_date = moment(this.paramsToUpdate.min_date).format('YYYY-MM-DD')
        }
        if (this.paramsToUpdate.max_date !== null) {
            this.paramsToUpdate.max_date = moment(this.paramsToUpdate.max_date).format('YYYY-MM-DD 00:00:00')
            this.paramsToUpdate.max_date = moment(this.paramsToUpdate.max_date).format('YYYY-MM-DD')
        }
        this.paramsToUpdate.page = page
        this.paramsUpdateSettings()
        this.router.navigate(['/search'], { queryParams: this.paramsToUpdate, replaceUrl: true })
    }

    paramsUpdateSettings() {
        if (this.paramsToUpdate.title === '') {
            this.paramsToUpdate.title = null
        }
        if (this.paramsToUpdate.order_by === '') {
            this.paramsToUpdate.order_by = null
        }
        if (this.paramsToUpdate.min_amount === '') {
            this.paramsToUpdate.min_amount = null
        }
        if (this.paramsToUpdate.max_amount === '') {
            this.paramsToUpdate.max_amount = null
        }
        if (this.paramsToUpdate.project_status === '') {
            this.paramsToUpdate.project_status = null
        }
        if (this.paramsToUpdate.address === '') {
            this.paramsToUpdate.address = null
        }
        if (this.paramsToUpdate.division_id === '') {
            this.paramsToUpdate.division_id = null
        }
        if (this.paramsToUpdate.page === '') {
            this.paramsToUpdate.page = null
        }
        if (this.paramsToUpdate.location === '') {
            this.paramsToUpdate.location = null
        }
        if (this.paramsToUpdate.country === '') {
            this.paramsToUpdate.country = null
        }
        if (this.paramsToUpdate.qto_projects === '') {
            this.paramsToUpdate.qto_projects = null
        }
    }

}
