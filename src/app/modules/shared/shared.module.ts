import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuestLayoutComponent } from 'src/app/layouts/guest-layout/guest.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';



@NgModule({
  declarations: [ GuestLayoutComponent, HeaderComponent, SideNavComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ CommonModule, GuestLayoutComponent, HeaderComponent, SideNavComponent]
})
export class SharedModule { }
