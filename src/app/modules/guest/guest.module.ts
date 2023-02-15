import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { GuessRoutingModule } from './guest-routing.module';
import { CardComponent } from 'src/app/components/card/card.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
  ],
  imports: [
    GuessRoutingModule,
    SharedModule,
  ]
})
export class GuestModule { }
