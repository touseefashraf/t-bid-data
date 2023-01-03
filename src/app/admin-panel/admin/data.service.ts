import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { apis } from '../../../../src/environments/environment'

@Injectable()
export class DataService {
    private baseUrl = `${apis.baseUrl}/admin`
    private data = new BehaviorSubject<Array<any>>([{fetching: true}])
    public permissionsList = []
    data$ = this.data.asObservable()

    constructor(public http: HttpClient) {
    }

    updateSource(newData: any) {
        this.data.next(newData)
    }

    updateItem(item: any, index: number): void {
        this.data.getValue()[index] = item
    }

    addItem(item: any): void {
        this.data.getValue().push(item)
    }

    getItem(index: number) {
        return this.data.getValue()[index]
    }

    deleteItem(index: number) {
        const afterDel: any = []
        this.data.getValue().forEach( (item: any, i: number) => {
            if (i !== index) {
                afterDel.push(item)
            }
        })
        this.updateSource(afterDel)
    }

    save(params: any): Observable<any> {
        const url = `${this.baseUrl}/save-admin`

        return this.http.post<any>(url, params)
    }

    update(params: any): Observable<any> {
        const url = `${this.baseUrl}/update-admin`

        return this.http.post<any>(url, params)
    }

    delete(index: number): Observable<any> {
        const url = `${this.baseUrl}/delete-admin`
        const params = {
            id: this.getItem(index).id
        }

        return this.http.post<any>(url, params)
    }

    list(): Observable<any> {
        const url = `${this.baseUrl}/admin-list`

        return this.http.get<any>(url)
    }
}
