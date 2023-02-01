import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GuessRoutingModule } from './guest-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    GuessRoutingModule
  ]
})
export class GuestModule { }
