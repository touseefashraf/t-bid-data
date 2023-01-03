import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/website/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([{
      path:'',component:CartComponent
    }])
  ],
  declarations: [CartComponent],
  providers: [DataService]
})
export class CartModule { }
