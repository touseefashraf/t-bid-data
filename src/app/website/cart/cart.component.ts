import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from './data.service';
import { IAlertService } from 'src/app/libs/ialert/ialerts.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    coupon = ''
    subTotal = 0
    price = 0
    discount = 0
    percentage = 0
    tPrice = 0
    dataStatus = 'fetch'
    cartData: any
    data = []
    btnDisabled = false
    expiredCoupon = false
    waiting = {
        checkout: false
    }
    constructor(
        public alert: IAlertService,
        public ds: DataService,
        public api: ApiService
    ) {
        this.cartData = this.api.cartData
        if (this.cartData != null) {
            this.api.cartItmes.next(this.cartData.documents.length)
            this.subTotal = this.cartData.totalPrice
            this.tPrice = this.cartData.totalPrice
            this.dataStatus = 'done'
        }
    }

    ngOnInit() {
    }

    submitCoupon() {
        const param = { coupon: this.coupon }
        if (this.discount != 0) {
            this.alert.error('Discout is already applied')
            return false
        }
        if (this.coupon === '') {
            this.alert.error('Coupon is required')
            return false

        }
        this.btnDisabled = true
        this.ds.getCoupon(param).subscribe((resp: any) => {
            if (resp.success == false) {
                this.alert.error('Coupon is expire or not valid')
                this.expiredCoupon = true
            } else {
                this.expiredCoupon = false
                if (resp.data.discount_type == 'fixed') {
                    this.price = resp.data.discount
                    this.discount = this.price
                    this.tPrice -= this.price
                    if (this.tPrice < 0) {
                        this.tPrice = 0
                    }
                }
                else {
                    this.percentage = resp.data.discount
                    this.discount = (this.percentage / 100) * this.tPrice
                    this.tPrice = this.subTotal - this.discount
                }
            }
            this.btnDisabled = false
        })

    }

    deleteItem(d, index) {
        const ind = this.api.cartData.documents.findIndex(resp => resp.id == d.id)
        if (index > -1) {
            this.api.cartData.totalPrice -= d.price
            this.subTotal = this.api.cartData.totalPrice
            this.api.cartData.totalPrice -= this.discount
            this.tPrice = this.api.cartData.totalPrice
            this.api.cartData.documents.splice(ind, 1)
            this.api.cartItmes.next(this.api.cartData.documents.length)
            if (this.api.cartData.documents.length == 0) {
                localStorage.removeItem('cart')
                this.api.cartItmes.next(0)
                this.subTotal = 0
                this.discount = 0
                this.tPrice = 0
                this.api.cartData = null
            } else {
                this.api.cartData.totalPrice = this.subTotal
                localStorage.setItem('cart', JSON.stringify(this.api.cartData))
            }
        }
    }

    checkOut() {
        this.waiting.checkout = true
        const ids = []
        this.api.cartData.documents.forEach(row => {
            ids.push(row.id)
        });
        const params = { document_ids: ids, coupon: this.coupon }
        if (this.expiredCoupon) {
            delete params.coupon
        }
        this.ds.checkOut(params).subscribe((resp: any) => {
            this.waiting.checkout = false
            if (resp.success == false) {
                this.alert.error('some Error!!')
            }
            window.location = resp.data
        })

    }


}
