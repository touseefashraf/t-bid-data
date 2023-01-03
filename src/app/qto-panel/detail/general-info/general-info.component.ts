import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { ConstantsService } from 'src/app/services/constants.service';
@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
    @Input()
    p: any
    moment = moment
    dateFormat: any
  constructor(public cs: ConstantsService) {
    this.dateFormat = cs.DATE_TIME_FORMAT.DATE_AMPM
   }

  ngOnInit() {
  }

}
