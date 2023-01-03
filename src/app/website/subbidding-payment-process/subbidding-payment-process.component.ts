import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-subbidding-payment-process',
    templateUrl: './subbidding-payment-process.component.html',
    styleUrls: ['./subbidding-payment-process.component.css']
})
export class SubbiddingPaymentProcessComponent implements OnInit {
    message: any = []
    constructor(public route: ActivatedRoute) {
        this.message = this.route.snapshot.paramMap.get('message')
    }

    ngOnInit() {

    }

}
