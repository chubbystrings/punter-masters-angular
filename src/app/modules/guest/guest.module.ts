import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GuessRoutingModule } from './guest-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardComponent } from 'src/app/components/card/card.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    GuessRoutingModule
  ]
})
export class GuestModule { }
